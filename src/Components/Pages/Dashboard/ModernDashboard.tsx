import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Calendar, 
  ShoppingCart, 
  Bell, 
  Grid3X3, 
  Heart, 
  Package, 
  MessageCircle, 
  Tag, 
  Settings, 
  LogOut,
  Filter,
  ChevronLeft,
  ChevronRight,
  Plus,
  TrendingUp
} from 'lucide-react';
import './modernDashboard.css';

interface DashboardStats {
  completed: number;
  pending: number;
  highPriority: number;
  totalValue: number;
}

interface ShoppingItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  quantity: number;
}

const ModernDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedPriority, setSelectedPriority] = useState('All Priorities');
  const [showCompleted, setShowCompleted] = useState(false);
  const [stats] = useState<DashboardStats>({
    completed: 1,
    pending: 4,
    highPriority: 1,
    totalValue: 9790.92
  });
  
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([
    {
      id: '1',
      name: 'Organic Strawberries',
      price: 250.00,
      unit: 'per kg',
      category: 'Fruits',
      priority: 'high',
      completed: true,
      quantity: 2
    },
    {
      id: '2',
      name: 'Fresh Cabbage',
      price: 180.50,
      unit: 'per head',
      category: 'Vegetables',
      priority: 'medium',
      completed: false,
      quantity: 1
    },
    {
      id: '3',
      name: 'Premium Beef',
      price: 450.00,
      unit: 'per kg',
      category: 'Meat',
      priority: 'high',
      completed: false,
      quantity: 1
    },
    {
      id: '4',
      name: 'Fresh Orange Juice',
      price: 89.99,
      unit: 'per bottle',
      category: 'Drinks',
      priority: 'low',
      completed: false,
      quantity: 3
    },
    {
      id: '5',
      name: 'Whole Grain Bread',
      price: 45.00,
      unit: 'per loaf',
      category: 'Bread',
      priority: 'medium',
      completed: false,
      quantity: 2
    }
  ]);

  const categories = [
    { name: 'Fruits', icon: '🍎', color: '#ff6b6b' },
    { name: 'Bread', icon: '🍞', color: '#ffa726' },
    { name: 'Vegetables', icon: '🥬', color: '#66bb6a' },
    { name: 'Fish', icon: '🐟', color: '#42a5f5' },
    { name: 'Meat', icon: '🥩', color: '#ef5350' },
    { name: 'Drinks', icon: '🥤', color: '#ff8a65' },
    { name: 'Sea Food', icon: '🦐', color: '#26c6da' },
    { name: 'Ice cream', icon: '🍦', color: '#ab47bc' },
    { name: 'Juice', icon: '🧃', color: '#ffee58' }
  ];

  const sidebarItems = [
    { icon: Grid3X3, label: 'Dashboard', key: 'dashboard' },
    { icon: Tag, label: 'Categories', key: 'categories' },
    { icon: Heart, label: 'Favourite', key: 'favourite' },
    { icon: Package, label: 'Orders', key: 'orders' },
    { icon: MessageCircle, label: 'Messages', key: 'messages' },
    { icon: TrendingUp, label: 'Top Deals', key: 'deals' },
    { icon: Settings, label: 'Settings', key: 'settings' }
  ];

  const toggleItemCompletion = (id: string) => {
    setShoppingItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const filteredItems = shoppingItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory;
    const matchesPriority = selectedPriority === 'All Priorities' || item.priority === selectedPriority;
    const matchesCompleted = showCompleted || !item.completed;
    
    return matchesSearch && matchesCategory && matchesPriority && matchesCompleted;
  });

  const completionPercentage = (stats.completed / (stats.completed + stats.pending)) * 100;

  // Update progress bar width
  useEffect(() => {
    const progressBar = document.querySelector('.progress-fill') as HTMLElement;
    if (progressBar) {
      progressBar.style.width = `${completionPercentage}%`;
    }
  }, [completionPercentage]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    window.location.href = '/';
  };

  return (
    <div className="modern-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <img src="/Image/Logo.png" alt="Logo" />
            <span className="logo-text">Satu Shop</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {sidebarItems.map(({ icon: Icon, label, key }) => (
            <button
              key={key}
              className={`sidebar-item ${activeSection === key ? 'active' : ''}`}
              onClick={() => setActiveSection(key)}
            >
              <Icon size={20} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-item logout" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <div className="search-section">
            <div className="search-container">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search your grocery products etc..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="header-actions">
            <button className="header-btn" title="Calendar" aria-label="Calendar">
              <Calendar size={20} />
            </button>
            <button className="header-btn notification" title="Notifications" aria-label="Notifications">
              <Bell size={20} />
              <span className="notification-dot"></span>
            </button>
            <button className="header-btn notification" title="Shopping Cart" aria-label="Shopping Cart">
              <ShoppingCart size={20} />
              <span className="notification-dot"></span>
            </button>
            <div className="user-profile">
              <img src="/Image/Logo.png" alt="User" className="user-avatar" />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        {activeSection === 'dashboard' && (
          <div className="dashboard-content">
            {/* Categories Section */}
            <section className="categories-section">
              <div className="section-header">
                <h2>Categories</h2>
                <div className="section-actions">
                  <button className="filter-btn">
                    <Filter size={16} />
                    Filter
                  </button>
                  <button className="nav-btn" title="Previous" aria-label="Previous">
                    <ChevronLeft size={16} />
                  </button>
                  <button className="nav-btn" title="Next" aria-label="Next">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              <div className="categories-grid">
                {categories.map((category, index) => (
                  <div key={index} className="category-card">
                    <div className={`category-icon ${category.name.toLowerCase().replace(' ', '')}`}>
                      <span>{category.icon}</span>
                    </div>
                    <span className="category-name">{category.name}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Shopping List Section */}
            <section className="shopping-list-section">
              <div className="section-header">
                <h2>My Shopping List</h2>
                <button className="add-item-btn">
                  <Plus size={16} />
                  Add Item
                </button>
              </div>

              <div className="list-subtitle">
                Manage your shopping items efficiently
              </div>

              {/* Stats Cards */}
              <div className="stats-grid">
                <div className="stat-card completed">
                  <div className="stat-icon">
                    <div className="icon-circle green">
                      ✓
                    </div>
                  </div>
                  <div className="stat-content">
                    <h3>{stats.completed}</h3>
                    <p>Completed</p>
                  </div>
                </div>

                <div className="stat-card pending">
                  <div className="stat-icon">
                    <div className="icon-circle yellow">
                      ⏱
                    </div>
                  </div>
                  <div className="stat-content">
                    <h3>{stats.pending}</h3>
                    <p>Pending</p>
                  </div>
                </div>

                <div className="stat-card priority">
                  <div className="stat-icon">
                    <div className="icon-circle red">
                      ⚡
                    </div>
                  </div>
                  <div className="stat-content">
                    <h3>{stats.highPriority}</h3>
                    <p>High Priority</p>
                  </div>
                </div>

                <div className="stat-card total">
                  <div className="stat-icon">
                    <div className="icon-circle blue">
                      R
                    </div>
                  </div>
                  <div className="stat-content">
                    <h3>R{stats.totalValue.toFixed(2)}</h3>
                    <p>Total Value</p>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="progress-section">
                <div className="progress-header">
                  <span>Progress: {Math.round(completionPercentage)}% Complete</span>
                  <span>{stats.completed} of {stats.completed + stats.pending} items</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    data-progress={completionPercentage}
                  ></div>
                </div>
              </div>

              {/* Filters */}
              <div className="filters-section">
                <div className="search-filter">
                  <Search size={16} />
                  <input
                    type="text"
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="filter-select"
                  title="Filter by category"
                  aria-label="Filter by category"
                >
                  <option value="All Categories">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}
                </select>

                <select 
                  value={selectedPriority} 
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="filter-select"
                  title="Filter by priority"
                  aria-label="Filter by priority"
                >
                  <option value="All Priorities">All Priorities</option>
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>

                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={showCompleted}
                    onChange={(e) => setShowCompleted(e.target.checked)}
                    title="Show completed items"
                    aria-label="Show completed items"
                  />
                  <span className="checkmark"></span>
                  Show Completed
                </label>
              </div>

              {/* Items List */}
              <div className="items-list">
                {filteredItems.map((item) => (
                  <div key={item.id} className={`item-card ${item.completed ? 'completed' : ''}`}>
                    <div className="item-checkbox">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleItemCompletion(item.id)}
                        title={`Mark ${item.name} as ${item.completed ? 'incomplete' : 'complete'}`}
                        aria-label={`Mark ${item.name} as ${item.completed ? 'incomplete' : 'complete'}`}
                      />
                    </div>
                    <div className="item-content">
                      <h4 className="item-name">{item.name}</h4>
                      <div className="item-details">
                        <span className="item-category">{item.category}</span>
                        <span className={`item-priority ${item.priority}`}>
                          {item.priority.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="item-quantity">
                      <span>Qty: {item.quantity}</span>
                    </div>
                    <div className="item-price">
                      <span>R{item.price.toFixed(2)}</span>
                      <small>{item.unit}</small>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default ModernDashboard;
