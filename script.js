// Simulate fetching products

const productGrid = document.querySelector('.product-grid');
const searchBar = document.getElementById('search-bar');
const categoryFilter = document.getElementById('category-filter');
const sortFilter = document.getElementById('sort-filter');
const quickViewModalContainer = document.getElementById('quick-view-modal-container');

function displayProducts(productsToDisplay) {
    if (productGrid) {
        productGrid.innerHTML = '';
        productsToDisplay.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">UGX ${product.price}</p>
                <button onclick="addToCart(${product.id})" class="space-right">Add to Cart</button>
                <button onclick="openQuickView(${product.id})">Quick View</button>
            `;
            productGrid.appendChild(productCard);
        });
    }
}

function filterAndSortProducts() {
    let filteredProducts = [...products];

    if (searchBar) {
        const searchTerm = searchBar.value.toLowerCase();
        filteredProducts = filteredProducts.filter(product => product.name.toLowerCase().includes(searchTerm));
    }

    if (categoryFilter) {
        const selectedCategory = categoryFilter.value;
        if (selectedCategory !== 'all') {
            filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
        }
    }

    if (sortFilter) {
        const sortValue = sortFilter.value;
        if (sortValue === 'price-asc') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortValue === 'price-desc') {
            filteredProducts.sort((a, b) => b.price - a.price);
        } else if (sortValue === 'name-asc') {
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortValue === 'name-desc') {
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        }
    }

    displayProducts(filteredProducts);
}

if (searchBar) {
    searchBar.addEventListener('input', filterAndSortProducts);
}
if (categoryFilter) {
    categoryFilter.addEventListener('change', filterAndSortProducts);
}
if (sortFilter) {
    sortFilter.addEventListener('change', filterAndSortProducts);
}

function openProductDetails(productId) {
    window.location.href = `product-details.html?id=${productId}`;
}

function openQuickView(productId) {
    const product = products.find(p => p.id === productId);
    if (product && quickViewModalContainer) {
        fetch('quick-view-modal.html')
            .then(response => response.text())
            .then(html => {
                quickViewModalContainer.innerHTML = html;
                const modal = document.getElementById('quick-view-modal');
                const modalProductDetails = document.getElementById('modal-product-details');
                modalProductDetails.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" style="max-width: 100%;">
                    <h3>${product.name}</h3>
                    <p>${product.description || 'No description available.'}</p>
                    <p class="price">UGX ${product.price}</p>
                    <button onclick="openProductDetails(${product.id})">View Full Details</button>
                `;
                modal.style.display = 'block';

                const closeButton = document.querySelector('.close-button');
                closeButton.onclick = function() {
                    modal.style.display = 'none';
                }

                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = 'none';
                    }
                }
            });
    }
}

function addToCart(productId, quantity = 1) {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        alert('Please log in to add items to your cart.');
        window.location.href = 'login.html';
        return;
    }

    const product = products.find(p => p.id === productId);
    if (product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.push({ ...product, quantity: quantity });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} has been added to your cart.`);
    }
}

// Initial display of all products
filterAndSortProducts();

// Handle category filter from URL
const urlParams = new URLSearchParams(window.location.search);
const categoryParam = urlParams.get('category');
if (categoryParam && categoryFilter) {
    categoryFilter.value = categoryParam;
    filterAndSortProducts();
}

