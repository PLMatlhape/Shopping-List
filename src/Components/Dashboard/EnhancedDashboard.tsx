import React, { useState, useEffect } from 'react';
import { Plus, Search, TrendingUp, CheckCircle, Clock, DollarSign } from 'lucide-react';
import { useShoppingList } from '../../hooks/useShoppingList';
import AddItemForm from '../Forms/AddItemForm';
import ShoppingItemComponent from '../ShoppingItem/ShoppingItemComponent';
import type { CreateShoppingItemDto } from '../../types/shopping';
import './EnhancedDashboard.css';

// Mock user - in a real app this would come from authentication
const CURRENT_USER_ID = '1';
const CURRENT_LIST_ID = '1';

const EnhancedDashboard: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);

  const {
    items,
    categories,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
    toggleItem,
    clearError,
    totalValue,
    completionPercentage
  } = useShoppingList(CURRENT_USER_ID, CURRENT_LIST_ID);

  const handleAddItem = async (itemData: CreateShoppingItemDto) => {
    const newItem = await addItem(itemData);
    if (newItem) {
      setShowAddForm(false);
    }
  };

  // Filter items based on search and filters
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || item.category === filterCategory;
    const matchesPriority = !filterPriority || item.priority === filterPriority;
    const matchesCompletion = showCompleted || !item.isCompleted;
    
    return matchesSearch && matchesCategory && matchesPriority && matchesCompletion;
  });

  const pendingItems = filteredItems.filter(item => !item.isCompleted);
  const completedItems = filteredItems.filter(item => item.isCompleted);

  const stats = {
    totalItems: items.length,
    completedItems: items.filter(item => item.isCompleted).length,
    pendingItems: items.filter(item => !item.isCompleted).length,
    highPriorityItems: items.filter(item => item.priority === 'high' && !item.isCompleted).length
  };

  useEffect(() => {
    if (error) {
      console.error('Shopping list error:', error);
    }
  }, [error]);

  return (
    <div className="enhanced-dashboard">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>My Shopping List</h1>
          <p>Manage your shopping items efficiently</p>
        </div>
        
        <button 
          onClick={() => setShowAddForm(true)}
          className="btn-primary add-item-btn"
        >
          <Plus size={20} />
          Add Item
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <CheckCircle className="text-green" />
          </div>
          <div className="stat-content">
            <h3>{stats.completedItems}</h3>
            <p>Completed</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <Clock className="text-orange" />
          </div>
          <div className="stat-content">
            <h3>{stats.pendingItems}</h3>
            <p>Pending</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <TrendingUp className="text-red" />
          </div>
          <div className="stat-content">
            <h3>{stats.highPriorityItems}</h3>
            <p>High Priority</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <DollarSign className="text-blue" />
          </div>
          <div className="stat-content">
            <h3>R{totalValue.toFixed(2)}</h3>
            <p>Total Value</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {items.length > 0 && (
        <div className="progress-section">
          <div className="progress-header">
            <span>Progress: {Math.round(completionPercentage)}% Complete</span>
            <span>{stats.completedItems} of {stats.totalItems} items</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              data-progress={`${completionPercentage}%`}
            />
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="filters-section">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="filter-select"
            title="Filter by category"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.name}>
                {category.icon} {category.name}
              </option>
            ))}
          </select>
          
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="filter-select"
            title="Filter by priority"
          >
            <option value="">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={showCompleted}
              onChange={(e) => setShowCompleted(e.target.checked)}
            />
            Show Completed
          </label>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="error-banner">
          <p>{error}</p>
          <button onClick={clearError} className="btn-secondary btn-sm">
            Dismiss
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      )}

      {/* Shopping Items */}
      <div className="items-section">
        {/* Pending Items */}
        {pendingItems.length > 0 && (
          <div className="items-group">
            <h3 className="group-title">
              Pending Items ({pendingItems.length})
            </h3>
            <div className="items-list">
              {pendingItems.map(item => (
                <ShoppingItemComponent
                  key={item.id}
                  item={item}
                  onToggle={toggleItem}
                  onUpdate={updateItem}
                  onDelete={deleteItem}
                />
              ))}
            </div>
          </div>
        )}

        {/* Completed Items */}
        {showCompleted && completedItems.length > 0 && (
          <div className="items-group">
            <h3 className="group-title">
              Completed Items ({completedItems.length})
            </h3>
            <div className="items-list">
              {completedItems.map(item => (
                <ShoppingItemComponent
                  key={item.id}
                  item={item}
                  onToggle={toggleItem}
                  onUpdate={updateItem}
                  onDelete={deleteItem}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredItems.length === 0 && !loading && (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>No items found</h3>
            <p>
              {searchTerm || filterCategory || filterPriority
                ? 'Try adjusting your filters'
                : 'Add your first shopping item to get started'
              }
            </p>
            {!searchTerm && !filterCategory && !filterPriority && (
              <button 
                onClick={() => setShowAddForm(true)}
                className="btn-primary"
              >
                Add First Item
              </button>
            )}
          </div>
        )}
      </div>

      {/* Add Item Form Modal */}
      {showAddForm && (
        <AddItemForm
          categories={categories}
          onAddItem={handleAddItem}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
};

export default EnhancedDashboard;
