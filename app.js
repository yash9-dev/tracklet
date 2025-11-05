// Application Data
const appData = {
  stores: [
    {
      id: 1,
      name: "Tech Haven Electronics",
      address: "123 Main Street, Downtown",
      phone: "+1-555-0123",
      rating: 4.5,
      hours: "9:00 AM - 8:00 PM",
      coordinates: [40.7128, -74.0060],
      categories: ["Electronics", "Gadgets"],
      image: "https://via.placeholder.com/300x200?text=Tech+Haven"
    },
    {
      id: 2,
      name: "Green Grocers Market",
      address: "456 Oak Avenue, Midtown",
      phone: "+1-555-0124",
      rating: 4.8,
      hours: "7:00 AM - 10:00 PM",
      coordinates: [40.7580, -73.9855],
      categories: ["Groceries", "Organic"],
      image: "https://via.placeholder.com/300x200?text=Green+Grocers"
    },
    {
      id: 3,
      name: "Fashion Forward Boutique",
      address: "789 Style Boulevard, Uptown",
      phone: "+1-555-0125",
      rating: 4.3,
      hours: "10:00 AM - 9:00 PM",
      coordinates: [40.7749, -73.9442],
      categories: ["Clothing", "Fashion"],
      image: "https://via.placeholder.com/300x200?text=Fashion+Forward"
    }
  ],
  products: [
    {
      id: 1,
      name: "iPhone 15 Pro",
      category: "Electronics",
      price: 999.99,
      stock: 15,
      status: "In Stock",
      storeId: 1,
      storeName: "Tech Haven Electronics",
      image: "https://via.placeholder.com/200x200?text=iPhone+15+Pro",
      description: "Latest iPhone with Pro features",
      sku: "IPH15PRO001"
    },
    {
      id: 2,
      name: "Samsung Galaxy Watch",
      category: "Electronics",
      price: 329.99,
      stock: 3,
      status: "Low Stock",
      storeId: 1,
      storeName: "Tech Haven Electronics",
      image: "https://via.placeholder.com/200x200?text=Galaxy+Watch",
      description: "Smart watch with health tracking",
      sku: "SGW001"
    },
    {
      id: 3,
      name: "Organic Apples",
      category: "Groceries",
      price: 4.99,
      stock: 50,
      status: "In Stock",
      storeId: 2,
      storeName: "Green Grocers Market",
      image: "https://via.placeholder.com/200x200?text=Organic+Apples",
      description: "Fresh organic apples, 2lb bag",
      sku: "OA001"
    },
    {
      id: 4,
      name: "Wireless Headphones",
      category: "Electronics",
      price: 149.99,
      stock: 0,
      status: "Out of Stock",
      storeId: 1,
      storeName: "Tech Haven Electronics",
      image: "https://via.placeholder.com/200x200?text=Headphones",
      description: "Premium wireless headphones",
      sku: "WH001"
    },
    {
      id: 5,
      name: "Designer Jeans",
      category: "Clothing",
      price: 89.99,
      stock: 12,
      status: "In Stock",
      storeId: 3,
      storeName: "Fashion Forward Boutique",
      image: "https://via.placeholder.com/200x200?text=Designer+Jeans",
      description: "Premium denim jeans",
      sku: "DJ001"
    },
    {
      id: 6,
      name: "Coffee Beans - Premium Blend",
      category: "Groceries",
      price: 12.99,
      stock: 8,
      status: "In Stock",
      storeId: 2,
      storeName: "Green Grocers Market",
      image: "https://via.placeholder.com/200x200?text=Coffee+Beans",
      description: "Premium coffee beans, 1lb bag",
      sku: "CB001"
    }
  ],
  salesData: [
    { month: "Jan", sales: 12500, orders: 45 },
    { month: "Feb", sales: 15800, orders: 52 },
    { month: "Mar", sales: 18200, orders: 61 },
    { month: "Apr", sales: 22100, orders: 78 },
    { month: "May", sales: 25600, orders: 85 },
    { month: "Jun", sales: 28900, orders: 94 }
  ],
  categories: [
    "Electronics",
    "Groceries",
    "Clothing",
    "Books",
    "Home & Garden",
    "Sports",
    "Beauty",
    "Toys"
  ],
  recentOrders: [
    {
      id: "ORD001",
      customer: "John Smith",
      items: 3,
      total: 156.99,
      status: "Completed",
      time: "2024-09-17 14:30"
    },
    {
      id: "ORD002",
      customer: "Sarah Johnson",
      items: 1,
      total: 89.99,
      status: "Processing",
      time: "2024-09-17 13:45"
    },
    {
      id: "ORD003",
      customer: "Mike Wilson",
      items: 2,
      total: 45.98,
      status: "Completed",
      time: "2024-09-17 12:20"
    }
  ],
  userProfile: {
    shopkeeper: {
      name: "Alex Rodriguez",
      email: "alex@techhaven.com",
      shop: "Tech Haven Electronics",
      phone: "+1-555-0123",
      joinDate: "2023-06-15"
    },
    customer: {
      name: "Emma Davis",
      email: "emma.davis@email.com",
      location: "Downtown",
      joinDate: "2024-01-20"
    }
  }
};

// Application State
let currentUser = null;
let currentView = 'landing';
let currentDashboardView = 'overview';
let currentCustomerView = 'discover';
let posOrder = [];
let favoriteProducts = [];
let searchResults = [];

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing app...');
  initializeApp();
  setupEventListeners();
  loadUserState();
});

function initializeApp() {
  console.log('Initializing app...');
  // Show landing page by default
  showPageSection('landing-page');
  
  // Initialize charts after a short delay to ensure DOM is ready
  setTimeout(() => {
    initializeCharts();
  }, 100);
  
  // Populate initial data
  populateRecentOrders();
  populateInventory();
  populateCustomerProducts();
  populateStores();
}

function setupEventListeners() {
  console.log('Setting up event listeners...');
  
  // Search functionality
  const inventorySearch = document.getElementById('inventory-search');
  if (inventorySearch) {
    inventorySearch.addEventListener('input', handleInventorySearch);
  }
  
  const customerSearch = document.getElementById('customer-search');
  if (customerSearch) {
    customerSearch.addEventListener('input', handleCustomerSearch);
  }
  
  // Filter functionality
  const categoryFilter = document.getElementById('category-filter');
  const stockFilter = document.getElementById('stock-filter');
  
  if (categoryFilter) {
    categoryFilter.addEventListener('change', handleInventoryFilter);
  }
  
  if (stockFilter) {
    stockFilter.addEventListener('change', handleInventoryFilter);
  }
  
  // Customer filters
  const customerCategoryFilter = document.getElementById('customer-category-filter');
  const customerAvailabilityFilter = document.getElementById('customer-availability-filter');
  const customerPriceFilter = document.getElementById('customer-price-filter');
  
  if (customerCategoryFilter) {
    customerCategoryFilter.addEventListener('change', handleCustomerFilter);
  }
  
  if (customerAvailabilityFilter) {
    customerAvailabilityFilter.addEventListener('change', handleCustomerFilter);
  }
  
  if (customerPriceFilter) {
    customerPriceFilter.addEventListener('change', handleCustomerFilter);
  }
  
  // Mobile menu toggle
  const navToggle = document.getElementById('nav-toggle');
  if (navToggle) {
    navToggle.addEventListener('click', toggleMobileMenu);
  }
  
  // Prevent modal close on form interactions
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        hideModal(modal);
      }
    });
    
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
      modalContent.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    }
  });
}

// Authentication Functions
window.showAuthModal = function(userType = '') {
  console.log('Opening auth modal with user type:', userType);
  const modal = document.getElementById('auth-modal');
  const userTypeSelect = document.getElementById('user-type');
  
  if (userType && userTypeSelect) {
    userTypeSelect.value = userType;
  }
  
  modal.classList.remove('hidden');
  
  // Focus on first input
  setTimeout(() => {
    const firstInput = modal.querySelector('input');
    if (firstInput) {
      firstInput.focus();
    }
  }, 100);
}

window.hideAuthModal = function() {
  console.log('Closing auth modal');
  const modal = document.getElementById('auth-modal');
  modal.classList.add('hidden');
}

window.showAuthTab = function(tab) {
  console.log('Switching to auth tab:', tab);
  // Update tab buttons
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`[onclick="showAuthTab('${tab}')"]`).classList.add('active');
  
  // Update form content
  document.querySelectorAll('.auth-form-content').forEach(content => {
    content.classList.remove('active');
  });
  document.getElementById(`${tab}-form`).classList.add('active');
}

window.handleAuth = function(action) {
  console.log('Handling auth action:', action);
  const userType = document.getElementById('user-type')?.value || 'customer';
  
  // Simulate authentication
  if (action === 'login') {
    currentUser = {
      type: userType,
      ...appData.userProfile[userType]
    };
  } else {
    // Signup
    const nameInput = document.querySelector('#signup-form input[placeholder="Enter your full name"]');
    const emailInput = document.querySelector('#signup-form input[placeholder="Enter your email"]');
    
    currentUser = {
      type: userType,
      name: nameInput?.value || 'New User',
      email: emailInput?.value || 'user@example.com'
    };
  }
  
  hideAuthModal();
  showUserInterface();
  saveUserState();
  showToast('success', `Welcome ${currentUser.name}!`);
}

window.logout = function() {
  console.log('Logging out');
  currentUser = null;
  currentView = 'landing';
  showPageSection('landing-page');
  updateNavigation();
  clearUserState();
  showToast('info', 'Logged out successfully');
}

// Navigation Functions
function showPageSection(sectionId) {
  console.log('Showing page section:', sectionId);
  document.querySelectorAll('.page-section').forEach(section => {
    section.classList.remove('active');
  });
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('active');
    currentView = sectionId;
  }
}

function showUserInterface() {
  console.log('Showing user interface for:', currentUser.type);
  updateNavigation();
  
  if (currentUser.type === 'shopkeeper') {
    showPageSection('shopkeeper-dashboard');
    showDashboardView('overview');
  } else {
    showPageSection('customer-interface');
    showCustomerView('discover');
  }
}

function updateNavigation() {
  console.log('Updating navigation');
  const landingNav = document.getElementById('nav-menu-landing');
  const authNav = document.getElementById('nav-menu-auth');
  const username = document.getElementById('nav-username');
  
  if (currentUser) {
    landingNav?.classList.add('hidden');
    authNav?.classList.remove('hidden');
    if (username) {
      username.textContent = currentUser.name;
    }
  } else {
    landingNav?.classList.remove('hidden');
    authNav?.classList.add('hidden');
  }
}

// Dashboard Functions
window.showDashboardView = function(view) {
  console.log('Showing dashboard view:', view);
  // Update sidebar
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.classList.remove('active');
  });
  const activeLink = document.querySelector(`[onclick="showDashboardView('${view}')"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }
  
  // Update content
  document.querySelectorAll('.dashboard-view').forEach(viewEl => {
    viewEl.classList.remove('active');
  });
  const targetView = document.getElementById(`dashboard-${view}`);
  if (targetView) {
    targetView.classList.add('active');
    currentDashboardView = view;
    
    // Initialize view-specific functionality
    if (view === 'overview') {
      updateDashboardCharts();
    } else if (view === 'analytics') {
      updateAnalyticsCharts();
    } else if (view === 'pos') {
      initializePOS();
    }
  }
}

window.showCustomerView = function(view) {
  console.log('Showing customer view:', view);
  // Update navigation
  document.querySelectorAll('.customer-link').forEach(link => {
    link.classList.remove('active');
  });
  const activeLink = document.querySelector(`[onclick="showCustomerView('${view}')"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }
  
  // Update content
  document.querySelectorAll('.customer-view').forEach(viewEl => {
    viewEl.classList.remove('active');
  });
  const targetView = document.getElementById(`customer-${view}`);
  if (targetView) {
    targetView.classList.add('active');
    currentCustomerView = view;
  }
}

// Chart Functions
function initializeCharts() {
  console.log('Initializing charts...');
  initializeSalesChart();
  initializeMonthlySalesChart();
}

function initializeSalesChart() {
  const ctx = document.getElementById('salesChart');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: appData.salesData.map(d => d.month),
      datasets: [{
        label: 'Sales ($)',
        data: appData.salesData.map(d => d.sales),
        borderColor: '#1FB8CD',
        backgroundColor: 'rgba(31, 184, 205, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return '$' + value.toLocaleString();
            }
          }
        }
      }
    }
  });
}

function initializeMonthlySalesChart() {
  const ctx = document.getElementById('monthlySalesChart');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: appData.salesData.map(d => d.month),
      datasets: [{
        label: 'Monthly Sales',
        data: appData.salesData.map(d => d.sales),
        backgroundColor: '#1FB8CD',
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return '$' + value.toLocaleString();
            }
          }
        }
      }
    }
  });
}

function updateDashboardCharts() {
  // Charts are already initialized, no need to update for demo
}

function updateAnalyticsCharts() {
  // Charts are already initialized, no need to update for demo
}

// Data Population Functions
function populateRecentOrders() {
  const tbody = document.getElementById('recent-orders-table');
  if (!tbody) return;
  
  tbody.innerHTML = appData.recentOrders.map(order => `
    <tr>
      <td>${order.id}</td>
      <td>${order.customer}</td>
      <td>${order.items}</td>
      <td>$${order.total.toFixed(2)}</td>
      <td><span class="status status--${order.status.toLowerCase().replace(' ', '')}">${order.status}</span></td>
      <td>${formatTime(order.time)}</td>
    </tr>
  `).join('');
}

function populateInventory() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  
  const products = getFilteredProducts();
  
  grid.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-category">${product.category}</p>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <div class="product-stock">
          <span class="stock-status ${product.status.toLowerCase().replace(' ', '-')}">${product.status}</span>
          <span class="stock-quantity">${product.stock} units</span>
        </div>
        <div class="product-actions">
          <button class="btn btn--outline btn--sm" onclick="editProduct(${product.id})">
            <i class="fas fa-edit"></i> Edit
          </button>
          <button class="btn btn--outline btn--sm" onclick="deleteProduct(${product.id})">
            <i class="fas fa-trash"></i> Delete
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function populateCustomerProducts() {
  const container = document.getElementById('customer-products');
  if (!container) return;
  
  const products = getFilteredCustomerProducts();
  
  container.innerHTML = products.map(product => `
    <div class="customer-product-card">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="customer-product-info">
        <div class="store-info">
          <i class="fas fa-store"></i>
          ${product.storeName}
        </div>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-category">${product.category}</p>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <div class="product-availability">
          <span class="availability-status ${product.status.toLowerCase().replace(' ', '-')}">${product.status}</span>
          <button class="favorite-btn ${favoriteProducts.includes(product.id) ? 'active' : ''}" onclick="toggleFavorite(${product.id})">
            <i class="fas fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function populateStores() {
  const grid = document.getElementById('stores-grid');
  if (!grid) return;
  
  grid.innerHTML = appData.stores.map(store => `
    <div class="store-card">
      <img src="${store.image}" alt="${store.name}" class="store-image">
      <div class="store-card-info">
        <h3 class="store-name">${store.name}</h3>
        <p class="store-address">${store.address}</p>
        <div class="store-meta">
          <div class="store-rating">
            <i class="fas fa-star"></i>
            ${store.rating}
          </div>
          <div class="store-hours">${store.hours}</div>
        </div>
        <div class="store-categories">
          ${store.categories.map(cat => `<span class="store-category">${cat}</span>`).join('')}
        </div>
        <div class="store-actions">
          <button class="btn btn--outline btn--sm">
            <i class="fas fa-directions"></i> Directions
          </button>
          <button class="btn btn--primary btn--sm">
            <i class="fas fa-eye"></i> View Products
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Search and Filter Functions
function handleInventorySearch(event) {
  populateInventory();
}

function handleInventoryFilter() {
  populateInventory();
}

function handleCustomerSearch(event) {
  populateCustomerProducts();
}

function handleCustomerFilter() {
  populateCustomerProducts();
}

function getFilteredProducts() {
  let products = [...appData.products];
  
  const searchQuery = document.getElementById('inventory-search')?.value.toLowerCase() || '';
  const categoryFilter = document.getElementById('category-filter')?.value || '';
  const stockFilter = document.getElementById('stock-filter')?.value || '';
  
  if (searchQuery) {
    products = products.filter(product => 
      product.name.toLowerCase().includes(searchQuery) ||
      product.category.toLowerCase().includes(searchQuery)
    );
  }
  
  if (categoryFilter) {
    products = products.filter(product => product.category === categoryFilter);
  }
  
  if (stockFilter) {
    products = products.filter(product => product.status === stockFilter);
  }
  
  return products;
}

function getFilteredCustomerProducts() {
  let products = [...appData.products];
  
  const searchQuery = document.getElementById('customer-search')?.value.toLowerCase() || '';
  const categoryFilter = document.getElementById('customer-category-filter')?.value || '';
  const availabilityFilter = document.getElementById('customer-availability-filter')?.value || '';
  const priceFilter = document.getElementById('customer-price-filter')?.value || '';
  
  if (searchQuery) {
    products = products.filter(product => 
      product.name.toLowerCase().includes(searchQuery) ||
      product.category.toLowerCase().includes(searchQuery)
    );
  }
  
  if (categoryFilter) {
    products = products.filter(product => product.category === categoryFilter);
  }
  
  if (availabilityFilter) {
    products = products.filter(product => product.status === availabilityFilter);
  }
  
  if (priceFilter) {
    const [min, max] = priceFilter.split('-').map(Number);
    if (priceFilter === '100+') {
      products = products.filter(product => product.price >= 100);
    } else if (max) {
      products = products.filter(product => product.price >= min && product.price <= max);
    }
  }
  
  return products;
}

// POS Functions
function initializePOS() {
  console.log('Initializing POS...');
  filterPOSProducts('all');
}

window.filterPOSProducts = function(category) {
  console.log('Filtering POS products by category:', category);
  
  // Update active category button
  document.querySelectorAll('.pos-category-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Find the clicked button by comparing the onclick attribute or text content
  const buttons = document.querySelectorAll('.pos-category-btn');
  buttons.forEach(btn => {
    const btnText = btn.textContent.trim();
    if ((category === 'all' && btnText === 'All') || 
        (category !== 'all' && btnText === category)) {
      btn.classList.add('active');
    }
  });
  
  // Filter and display products
  const products = category === 'all' ? appData.products : appData.products.filter(p => p.category === category);
  const grid = document.getElementById('pos-products-grid');
  
  if (grid) {
    grid.innerHTML = products.filter(p => p.stock > 0).map(product => `
      <div class="pos-product-btn" onclick="addToPOSOrder(${product.id})">
        <img src="${product.image}" alt="${product.name}">
        <div class="name">${product.name}</div>
        <div class="price">$${product.price.toFixed(2)}</div>
      </div>
    `).join('');
  }
}

window.addToPOSOrder = function(productId) {
  console.log('Adding product to POS order:', productId);
  const product = appData.products.find(p => p.id === productId);
  if (!product || product.stock === 0) return;
  
  const existingItem = posOrder.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    posOrder.push({
      id: productId,
      name: product.name,
      price: product.price,
      quantity: 1
    });
  }
  
  updatePOSDisplay();
}

function updatePOSDisplay() {
  const container = document.getElementById('pos-order-items');
  const subtotalEl = document.getElementById('pos-subtotal');
  const taxEl = document.getElementById('pos-tax');
  const totalEl = document.getElementById('pos-total');
  
  if (!container || !subtotalEl || !taxEl || !totalEl) return;
  
  if (posOrder.length === 0) {
    container.innerHTML = '<p class="empty-order">No items added</p>';
    subtotalEl.textContent = '$0.00';
    taxEl.textContent = '$0.00';
    totalEl.textContent = '$0.00';
    return;
  }
  
  container.innerHTML = posOrder.map(item => `
    <div class="pos-order-item">
      <div class="pos-item-info">
        <div class="pos-item-name">${item.name}</div>
        <div class="pos-item-price">$${item.price.toFixed(2)} each</div>
      </div>
      <div class="pos-item-controls">
        <button class="pos-qty-btn" onclick="updatePOSQuantity(${item.id}, -1)">-</button>
        <span class="pos-qty">${item.quantity}</span>
        <button class="pos-qty-btn" onclick="updatePOSQuantity(${item.id}, 1)">+</button>
      </div>
    </div>
  `).join('');
  
  const subtotal = posOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  
  subtotalEl.textContent = '$' + subtotal.toFixed(2);
  taxEl.textContent = '$' + tax.toFixed(2);
  totalEl.textContent = '$' + total.toFixed(2);
}

window.updatePOSQuantity = function(productId, change) {
  const item = posOrder.find(item => item.id === productId);
  if (!item) return;
  
  item.quantity += change;
  
  if (item.quantity <= 0) {
    posOrder = posOrder.filter(i => i.id !== productId);
  }
  
  updatePOSDisplay();
}

window.clearPOSOrder = function() {
  console.log('Clearing POS order');
  posOrder = [];
  updatePOSDisplay();
}

window.processPOSSale = function() {
  console.log('Processing POS sale');
  if (posOrder.length === 0) {
    showToast('warning', 'No items in order');
    return;
  }
  
  const total = posOrder.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 1.08;
  
  // Create new order
  const newOrder = {
    id: `ORD${String(appData.recentOrders.length + 1).padStart(3, '0')}`,
    customer: 'Walk-in Customer',
    items: posOrder.reduce((sum, item) => sum + item.quantity, 0),
    total: total,
    status: 'Completed',
    time: new Date().toISOString().slice(0, 16).replace('T', ' ')
  };
  
  // Update stock levels
  posOrder.forEach(item => {
    const product = appData.products.find(p => p.id === item.id);
    if (product) {
      product.stock -= item.quantity;
      if (product.stock === 0) {
        product.status = 'Out of Stock';
      } else if (product.stock <= 5) {
        product.status = 'Low Stock';
      }
    }
  });
  
  appData.recentOrders.unshift(newOrder);
  
  clearPOSOrder();
  populateRecentOrders();
  populateInventory();
  filterPOSProducts('all');
  
  showToast('success', `Sale processed successfully! Total: $${total.toFixed(2)}`);
}

// Product Management Functions
window.showAddProductModal = function() {
  console.log('Opening add product modal');
  const modal = document.getElementById('add-product-modal');
  modal.classList.remove('hidden');
}

window.hideAddProductModal = function() {
  console.log('Closing add product modal');
  const modal = document.getElementById('add-product-modal');
  modal.classList.add('hidden');
  
  // Clear form
  document.getElementById('new-product-name').value = '';
  document.getElementById('new-product-category').value = 'Electronics';
  document.getElementById('new-product-price').value = '';
  document.getElementById('new-product-stock').value = '';
  document.getElementById('new-product-description').value = '';
}

window.addNewProduct = function() {
  console.log('Adding new product');
  const name = document.getElementById('new-product-name').value.trim();
  const category = document.getElementById('new-product-category').value;
  const price = parseFloat(document.getElementById('new-product-price').value);
  const stock = parseInt(document.getElementById('new-product-stock').value);
  const description = document.getElementById('new-product-description').value.trim();
  
  if (!name || !price || !stock) {
    showToast('error', 'Please fill in all required fields');
    return;
  }
  
  const newProduct = {
    id: Math.max(...appData.products.map(p => p.id)) + 1,
    name: name,
    category: category,
    price: price,
    stock: stock,
    status: stock > 5 ? 'In Stock' : stock > 0 ? 'Low Stock' : 'Out of Stock',
    storeId: 1,
    storeName: 'Tech Haven Electronics',
    image: `https://via.placeholder.com/200x200?text=${encodeURIComponent(name)}`,
    description: description,
    sku: `SKU${String(appData.products.length + 1).padStart(3, '0')}`
  };
  
  appData.products.push(newProduct);
  populateInventory();
  hideAddProductModal();
  showToast('success', 'Product added successfully!');
}

window.editProduct = function(productId) {
  showToast('info', 'Edit product functionality would open here');
}

window.deleteProduct = function(productId) {
  if (confirm('Are you sure you want to delete this product?')) {
    appData.products = appData.products.filter(p => p.id !== productId);
    populateInventory();
    showToast('success', 'Product deleted successfully');
  }
}

// Customer Functions
window.toggleFavorite = function(productId) {
  const index = favoriteProducts.indexOf(productId);
  
  if (index === -1) {
    favoriteProducts.push(productId);
    showToast('success', 'Added to favorites');
  } else {
    favoriteProducts.splice(index, 1);
    showToast('info', 'Removed from favorites');
  }
  
  populateCustomerProducts();
  saveFavorites();
}

// Utility Functions
function formatTime(timeString) {
  const date = new Date(timeString);
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
}

function showToast(type, message) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
    <span>${message}</span>
  `;
  
  container.appendChild(toast);
  
  // Remove toast after 5 seconds
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 5000);
}

function toggleMobileMenu() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.classList.toggle('open');
  }
}

function hideModal(modal) {
  modal.classList.add('hidden');
}

// State Management
function saveUserState() {
  if (currentUser) {
    sessionStorage.setItem('tracklet_user', JSON.stringify(currentUser));
    sessionStorage.setItem('tracklet_view', currentView);
  }
}

function loadUserState() {
  const savedUser = sessionStorage.getItem('tracklet_user');
  const savedView = sessionStorage.getItem('tracklet_view');
  
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    currentView = savedView || 'landing-page';
    showUserInterface();
  }
  
  loadFavorites();
}

function clearUserState() {
  sessionStorage.removeItem('tracklet_user');
  sessionStorage.removeItem('tracklet_view');
}

function saveFavorites() {
  localStorage.setItem('tracklet_favorites', JSON.stringify(favoriteProducts));
}

function loadFavorites() {
  const saved = localStorage.getItem('tracklet_favorites');
  if (saved) {
    favoriteProducts = JSON.parse(saved);
  }
}