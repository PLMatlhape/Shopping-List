import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Calendar, 
  ShoppingCart, 
  Bell, 
  Grid3X3, 
  Heart, 
  Package, 
  MessageCircle, 
  Settings, 
  LogOut,
  Filter,
  ChevronLeft,
  ChevronRight,
  Plus,
  TrendingUp,
  User, 
  Mail, 
  Phone, 
  Camera, 
  Save,
  Edit3,
  Check,
  X
} from 'lucide-react';
import './dashboard.css';

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
  isFavorite?: boolean;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  const avatarOptions = [
    { id: 'boy', name: 'Boy Avatar', path: '/Image/Boy-avator.png' },
    { id: 'girl', name: 'Girl Avatar', path: '/Image/Girl-avator.png' },
    { id: 'grandpa', name: 'Grandpa Avatar', path: '/Image/Grandpa-avatar.png' },
    { id: 'granny', name: 'Granny Avatar', path: '/Image/Granny-avator.png' }
  ];

  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedPriority, setSelectedPriority] = useState('All Priorities');
  const [showCompleted, setShowCompleted] = useState(false);
  const [showProfilePanel, setShowProfilePanel] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [editedUser, setEditedUser] = useState<{
    name: string;
    surname: string;
    email: string;
    cellNumber: string;
    avatar: string;
  } | null>(null);
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    surname: string;
    avatar: string;
  } | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
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
      quantity: 2,
      isFavorite: true
    },
    {
      id: '2',
      name: 'Fresh Cabbage',
      price: 180.50,
      unit: 'per head',
      category: 'Vegetables',
      priority: 'medium',
      completed: false,
      quantity: 1,
      isFavorite: false
    },
    {
      id: '3',
      name: 'Premium Beef',
      price: 450.00,
      unit: 'per kg',
      category: 'Meat',
      priority: 'high',
      completed: false,
      quantity: 1,
      isFavorite: true
    },
    {
      id: '4',
      name: 'Fresh Orange Juice',
      price: 89.99,
      unit: 'per bottle',
      category: 'Drinks',
      priority: 'low',
      completed: false,
      quantity: 3,
      isFavorite: false
    },
    {
      id: '5',
      name: 'Whole Grain Bread',
      price: 45.00,
      unit: 'per loaf',
      category: 'Bread',
      priority: 'medium',
      completed: false,
      quantity: 2,
      isFavorite: true
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
    { icon: Heart, label: 'Favourite', key: 'favourite' },
    { icon: Package, label: 'Collected/Purchased', key: 'orders' },
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

  // Load user data
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const parsedUser = JSON.parse(userInfo);
      setCurrentUser({
        name: parsedUser.name || 'User',
        surname: parsedUser.surname || '',
        avatar: parsedUser.avatar || '/Image/Boy-avator.png'
      });
      setEditedUser({
        name: parsedUser.name || '',
        surname: parsedUser.surname || '',
        email: parsedUser.email || '',
        cellNumber: parsedUser.cellNumber || '',
        avatar: parsedUser.avatar || '/Image/Boy-avator.png'
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    window.location.href = '/';
  };

  const handleProfileClick = () => {
    setShowProfilePanel(!showProfilePanel);
  };

  const toggleFavorite = (itemId: string) => {
    setShoppingItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId 
          ? { ...item, isFavorite: !item.isFavorite }
          : item
      )
    );
  };

  const favoriteItems = shoppingItems.filter(item => item.isFavorite);

  return (
    <div className="modern-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <img 
              src={currentUser?.avatar || '/Image/Boy-avator.png'} 
              alt="User Avatar" 
              className="user-sidebar-avatar"
            />
            <span className="logo-text">
              {currentUser ? `${currentUser.name} ${currentUser.surname}` : 'User'}
            </span>
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
            <img 
              src={currentUser?.avatar || '/Image/Boy-avator.png'} 
              alt="User" 
              className="user-avatar" 
              title="Go to Profile"
              onClick={handleProfileClick}
            />
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
                    <button 
                      className="favorite-btn"
                      onClick={() => toggleFavorite(item.id)}
                      title={item.isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                      <Heart 
                        size={18} 
                        fill={item.isFavorite ? "#ff4757" : "none"}
                        color={item.isFavorite ? "#ff4757" : "#ccc"}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Favourite Section */}
        {activeSection === 'favourite' && (
          <div className="dashboard-content">
            <section className="favorites-section">
              <div className="section-header">
                <h2>Favourite Items</h2>
                <p className="section-subtitle">Your most loved grocery items</p>
              </div>

              {favoriteItems.length === 0 ? (
                <div className="empty-favorites">
                  <Heart size={48} color="#ddd" />
                  <h3>No favorite items yet</h3>
                  <p>Add items to your favorites by clicking the heart icon</p>
                </div>
              ) : (
                <div className="favorites-grid">
                  {favoriteItems.map((item) => (
                    <div key={item.id} className={`favorite-item-card ${item.completed ? 'completed' : ''}`}>
                      <div className="favorite-item-header">
                        <h4 className="item-name">{item.name}</h4>
                        <button 
                          className="remove-favorite-btn"
                          onClick={() => toggleFavorite(item.id)}
                          title="Remove from favorites"
                        >
                          <Heart size={20} fill="#ff4757" color="#ff4757" />
                        </button>
                      </div>
                      <div className="item-details">
                        <span className="item-category">{item.category}</span>
                        <span className={`item-priority ${item.priority}`}>
                          {item.priority}
                        </span>
                      </div>
                      <div className="item-pricing">
                        <span className="item-price">R{item.price.toFixed(2)}</span>
                        <small className="item-unit">{item.unit}</small>
                      </div>
                      <div className="item-actions">
                        <span className="item-quantity">Qty: {item.quantity}</span>
                        <span className={`item-status ${item.completed ? 'completed' : 'pending'}`}>
                          {item.completed ? 'Completed' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </main>

      {/* Profile Side Panel */}
      {showProfilePanel && (
        <div className="profile-panel-overlay" onClick={() => setShowProfilePanel(false)}>
          <div className="profile-panel" onClick={(e) => e.stopPropagation()}>
            <div className="profile-panel-header">
              <h2>Profile Settings</h2>
              <button 
                className="close-panel-btn" 
                onClick={() => setShowProfilePanel(false)}
                title="Close Profile Panel"
              >
                <X size={20} />
              </button>
            </div>

            <div className="profile-panel-content">
              {/* Avatar Section */}
              <div className="profile-avatar-section">
                <div className="avatar-container">
                  <img 
                    src={currentUser?.avatar || '/Image/Boy-avator.png'} 
                    alt="User Avatar" 
                    className="profile-main-avatar"
                  />
                  <button 
                    className="avatar-edit-btn"
                    onClick={() => setShowAvatarSelector(!showAvatarSelector)}
                    title="Change Avatar"
                  >
                    <Camera size={16} />
                  </button>
                </div>

                {showAvatarSelector && (
                  <div className="avatar-selector">
                    <h4>Choose Avatar</h4>
                    <div className="avatar-options">
                      {avatarOptions.map((avatar) => (
                        <div 
                          key={avatar.id}
                          className={`avatar-option ${currentUser?.avatar === avatar.path ? 'selected' : ''}`}
                          onClick={() => {
                            const userInfo = localStorage.getItem('userInfo');
                            if (userInfo) {
                              const user = JSON.parse(userInfo);
                              user.avatar = avatar.path;
                              localStorage.setItem('userInfo', JSON.stringify(user));
                              setCurrentUser(prev => prev ? {...prev, avatar: avatar.path} : null);
                            }
                            setShowAvatarSelector(false);
                          }}
                        >
                          <img src={avatar.path} alt={avatar.name} />
                          <span>{avatar.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* User Info Section */}
              <div className="profile-info-section">
                <div className="profile-field">
                  <div className="field-header">
                    <User size={16} />
                    <span>Name</span>
                    <button 
                      className="edit-field-btn"
                      onClick={() => setIsEditingProfile(!isEditingProfile)}
                      title="Edit Profile"
                    >
                      <Edit3 size={14} />
                    </button>
                  </div>
                  {isEditingProfile ? (
                    <div className="edit-field-group">
                      <input 
                        type="text" 
                        value={editedUser?.name || currentUser?.name || ''} 
                        onChange={(e) => setEditedUser(prev => ({
                          ...prev!,
                          name: e.target.value
                        }))}
                        placeholder="First Name"
                      />
                      <input 
                        type="text" 
                        value={editedUser?.surname || currentUser?.surname || ''} 
                        onChange={(e) => setEditedUser(prev => ({
                          ...prev!,
                          surname: e.target.value
                        }))}
                        placeholder="Last Name"
                      />
                    </div>
                  ) : (
                    <p>{`${currentUser?.name || ''} ${currentUser?.surname || ''}`}</p>
                  )}
                </div>

                <div className="profile-field">
                  <div className="field-header">
                    <Mail size={16} />
                    <span>Email</span>
                  </div>
                  {isEditingProfile ? (
                    <input 
                      type="email" 
                      value={editedUser?.email || ''} 
                      onChange={(e) => setEditedUser(prev => ({
                        ...prev!,
                        email: e.target.value
                      }))}
                      placeholder="Email Address"
                    />
                  ) : (
                    <p>{editedUser?.email || 'No email provided'}</p>
                  )}
                </div>

                <div className="profile-field">
                  <div className="field-header">
                    <Phone size={16} />
                    <span>Phone</span>
                  </div>
                  {isEditingProfile ? (
                    <input 
                      type="tel" 
                      value={editedUser?.cellNumber || ''} 
                      onChange={(e) => setEditedUser(prev => ({
                        ...prev!,
                        cellNumber: e.target.value
                      }))}
                      placeholder="Phone Number"
                    />
                  ) : (
                    <p>{editedUser?.cellNumber || 'No phone provided'}</p>
                  )}
                </div>

                {isEditingProfile && (
                  <div className="profile-actions">
                    <button 
                      className="save-profile-btn"
                      onClick={() => {
                        // Save profile changes
                        if (editedUser && currentUser) {
                          const userInfo = localStorage.getItem('userInfo');
                          if (userInfo) {
                            const user = JSON.parse(userInfo);
                            const updatedUser = { ...user, ...editedUser };
                            localStorage.setItem('userInfo', JSON.stringify(updatedUser));
                            setCurrentUser({
                              name: editedUser.name,
                              surname: editedUser.surname,
                              avatar: currentUser.avatar
                            });
                          }
                        }
                        setIsEditingProfile(false);
                      }}
                    >
                      <Save size={16} />
                      Save Changes
                    </button>
                    <button 
                      className="cancel-edit-btn"
                      onClick={() => {
                        setIsEditingProfile(false);
                        setEditedUser(null);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
