// Global Variables
let currentSection = 'dashboard';
let inventoryData = [
    {
        id: 1,
        name: 'Samsung Galaxy Earbuds',
        sku: 'SGE-001',
        category: 'Electronics',
        stock: 25,
        price: 2999,
        status: 'in-stock',
        image: 'https://via.placeholder.com/40'
    },
    {
        id: 2,
        name: 'Nike Running Shoes',
        sku: 'NRS-002',
        category: 'Sports',
        stock: 8,
        price: 4500,
        status: 'low-stock',
        image: 'https://via.placeholder.com/40'
    },
    {
        id: 3,
        name: 'iPhone Charger',
        sku: 'IPC-003',
        category: 'Electronics',
        stock: 3,
        price: 1299,
        status: 'low-stock',
        image: 'https://via.placeholder.com/40'
    },
    {
        id: 4,
        name: 'Notebook Set',
        sku: 'NBS-004',
        category: 'Stationery',
        stock: 0,
        price: 299,
        status: 'out-of-stock',
        image: 'https://via.placeholder.com/40'
    }
];

// DOM Elements
const menuItems = document.querySelectorAll('.menu-item');
const contentSections = document.querySelectorAll('.content-section');
const inventoryTableBody = document.getElementById('inventoryTableBody');
const addProductModal = document.getElementById('addProductModal');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const sidebar = document.querySelector('.sidebar');

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    renderInventoryTable();
    initializeSearch();
    initializeMobileMenu();
    generateMockChart();
});

// Navigation Functions
function initializeNavigation() {
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.getAttribute('data-section');
            switchSection(section);
        });
    });
}

function switchSection(sectionName) {
    // Update active menu item
    menuItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === sectionName) {
            item.classList.add('active');
        }
    });

    // Update active content section
    contentSections.forEach(section => {
        section.classList.remove('active');
        if (section.id === sectionName) {
            section.classList.add('active');
        }
    });

    currentSection = sectionName;

    // Close mobile menu when section is selected
    if (window.innerWidth <= 768) {
        sidebar.classList.remove('mobile-active');
    }
}

// Mobile Menu Functions
function initializeMobileMenu() {
    mobileMenuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-active');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                sidebar.classList.remove('mobile-active');
            }
        }
    });
}

// Inventory Management Functions
function renderInventoryTable() {
    if (!inventoryTableBody) return;

    inventoryTableBody.innerHTML = '';

    inventoryData.forEach(product => {
        const row = createInventoryRow(product);
        inventoryTableBody.appendChild(row);
    });
}

function createInventoryRow(product) {
    const row = document.createElement('tr');

    const statusClass = getStatusClass(product.status);
    const stockClass = getStockClass(product.stock);

    row.innerHTML = `
        <td>
            <div class="product-info">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <span>${product.name}</span>
            </div>
        </td>
        <td>${product.sku}</td>
        <td>${product.category}</td>
        <td>
            <span class="stock-level ${stockClass}">${product.stock}</span>
        </td>
        <td>₹${product.price.toLocaleString()}</td>
        <td><span class="status-badge ${statusClass}">${formatStatus(product.status)}</span></td>
        <td>
            <div class="action-buttons">
                <button class="btn-icon" onclick="editProduct(${product.id})" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon" onclick="deleteProduct(${product.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </td>
    `;

    return row;
}

function getStatusClass(status) {
    switch(status) {
        case 'in-stock': return 'in-stock';
        case 'low-stock': return 'low-stock';
        case 'out-of-stock': return 'out-of-stock';
        default: return 'in-stock';
    }
}

function getStockClass(stock) {
    if (stock === 0) return 'out';
    if (stock < 10) return 'low';
    return 'high';
}

function formatStatus(status) {
    return status.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

// Product Management Functions
function showAddProductModal() {
    addProductModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeAddProductModal() {
    addProductModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function editProduct(productId) {
    const product = inventoryData.find(p => p.id === productId);
    if (product) {
        // In a real application, this would open an edit modal with pre-filled data
        showNotification(`Editing ${product.name}`, 'info');
    }
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        inventoryData = inventoryData.filter(p => p.id !== productId);
        renderInventoryTable();
        updateStats();
        showNotification('Product deleted successfully', 'success');
    }
}

function addProduct(productData) {
    const newProduct = {
        id: inventoryData.length + 1,
        ...productData,
        status: productData.stock > 10 ? 'in-stock' : 'low-stock'
    };

    inventoryData.push(newProduct);
    renderInventoryTable();
    updateStats();
    closeAddProductModal();
    showNotification('Product added successfully', 'success');
}

// Search Functionality
function initializeSearch() {
    const searchInputs = document.querySelectorAll('.search-box input');

    searchInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();

            if (currentSection === 'inventory') {
                filterInventory(searchTerm);
            } else if (currentSection === 'discover') {
                filterProducts(searchTerm);
            }
        });
    });
}

function filterInventory(searchTerm) {
    const filteredData = inventoryData.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.sku.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );

    renderFilteredInventory(filteredData);
}

function renderFilteredInventory(data) {
    if (!inventoryTableBody) return;

    inventoryTableBody.innerHTML = '';

    data.forEach(product => {
        const row = createInventoryRow(product);
        inventoryTableBody.appendChild(row);
    });
}

function filterProducts(searchTerm) {
    // This would filter the product discovery grid
    showNotification(`Searching for: ${searchTerm}`, 'info');
}

// Statistics and Analytics
function updateStats() {
    const totalProducts = inventoryData.length;
    const lowStockItems = inventoryData.filter(p => p.stock < 10 && p.stock > 0).length;
    const outOfStockItems = inventoryData.filter(p => p.stock === 0).length;

    // Update stat cards (in a real app, these would be dynamic)
    console.log(`Stats: ${totalProducts} total, ${lowStockItems} low stock, ${outOfStockItems} out of stock`);
}

// Chart Generation (Mock)
function generateMockChart() {
    const canvas = document.getElementById('salesChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Simple mock chart drawing
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();

    // Mock sales data points
    const points = [
        {x: 50, y: 150},
        {x: 100, y: 120},
        {x: 150, y: 80},
        {x: 200, y: 100},
        {x: 250, y: 60},
        {x: 300, y: 40},
        {x: 350, y: 70}
    ];

    ctx.moveTo(points[0].x, points[0].y);
    points.forEach(point => {
        ctx.lineTo(point.x, point.y);
    });

    ctx.stroke();

    // Draw points
    ctx.fillStyle = '#667eea';
    points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
        ctx.fill();
    });

    // Add labels
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.fillText('Sales Trend', 10, 20);
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="closeNotification(this)">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add styles for notification
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 80px;
            right: 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            padding: 15px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            z-index: 3000;
            min-width: 300px;
            animation: slideInRight 0.3s ease-out;
        }

        .notification-info { border-left: 4px solid #17a2b8; }
        .notification-success { border-left: 4px solid #28a745; }
        .notification-warning { border-left: 4px solid #ffc107; }
        .notification-error { border-left: 4px solid #dc3545; }

        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .notification-close {
            background: none;
            border: none;
            cursor: pointer;
            color: #666;
            padding: 5px;
        }

        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;

    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'warning': return 'exclamation-triangle';
        case 'error': return 'times-circle';
        default: return 'info-circle';
    }
}

function closeNotification(button) {
    const notification = button.closest('.notification');
    if (notification) {
        notification.remove();
    }
}

// Form Handling
document.addEventListener('submit', function(e) {
    if (e.target.classList.contains('product-form')) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const productData = {
            name: formData.get('name') || 'New Product',
            sku: formData.get('sku') || 'SKU-' + Date.now(),
            category: formData.get('category') || 'General',
            price: parseFloat(formData.get('price')) || 0,
            stock: parseInt(formData.get('stock')) || 0,
            image: 'https://via.placeholder.com/40'
        };

        addProduct(productData);
    }
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target === addProductModal) {
        closeAddProductModal();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape' && addProductModal.style.display === 'block') {
        closeAddProductModal();
    }

    // Quick add product with Ctrl+N
    if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        showAddProductModal();
    }
});

// Mock real-time updates
function simulateRealTimeUpdates() {
    setInterval(() => {
        // Simulate random stock changes
        if (Math.random() < 0.1) { // 10% chance every interval
            const randomIndex = Math.floor(Math.random() * inventoryData.length);
            const product = inventoryData[randomIndex];

            if (product.stock > 0) {
                product.stock -= Math.floor(Math.random() * 3) + 1;
                if (product.stock < 0) product.stock = 0;

                // Update status based on new stock
                if (product.stock === 0) {
                    product.status = 'out-of-stock';
                } else if (product.stock < 10) {
                    product.status = 'low-stock';
                } else {
                    product.status = 'in-stock';
                }

                if (currentSection === 'inventory') {
                    renderInventoryTable();
                }

                showNotification(`${product.name} stock updated: ${product.stock} remaining`, 'info');
            }
        }
    }, 10000); // Every 10 seconds
}

// Start real-time simulation
setTimeout(simulateRealTimeUpdates, 5000); // Start after 5 seconds

// Utility Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

// Export functions for external use
window.trackletApp = {
    switchSection,
    showAddProductModal,
    closeAddProductModal,
    editProduct,
    deleteProduct,
    showNotification
};