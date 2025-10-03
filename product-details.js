const productDetailsContainer = document.querySelector('.product-details-container');

function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

function displayProductDetails() {
    const productId = getProductIdFromUrl();
    const product = products.find(p => p.id === productId);

    if (product && productDetailsContainer) {
        productDetailsContainer.innerHTML = `
            <div class="product-details-grid">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h2>${product.name}</h2>
                    <p class="price">UGX ${product.price}</p>
                    <p>${product.description}</p>
                    <div class="quantity-selector">
                        <label for="quantity" class="space-right">Quantity:</label>
                        <input type="number" id="quantity" value="1" min="1">
                    </div>
                    <button onclick="addToCartFromDetails(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
    }
}



displayProductDetails();

function addToCartFromDetails(productId) {
    const quantityInput = document.getElementById('quantity');
    const quantity = parseInt(quantityInput.value);
    addToCart(productId, quantity);
}
