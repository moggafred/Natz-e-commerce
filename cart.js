const cartItemsContainer = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayCartItems() {
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p class="price">UGX ${item.price}</p>
                    <div class="quantity">
                        <button onclick="decreaseQuantity(${item.id})">-</button>
                        <span class="space-right">${item.quantity}</span>
                        <button onclick="increaseQuantity(${item.id})">+</button>
                    </div>
                </div>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartTotal();
    displayCartItems();
}

function increaseQuantity(productId) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity++;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartTotal();
        displayCartItems();
    }
}

function decreaseQuantity(productId) {
    const product = cart.find(item => item.id === productId);
    if (product && product.quantity > 1) {
        product.quantity--;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartTotal();
        displayCartItems();
    }
}

function updateCartTotal() {
    if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toFixed(2);
    }
}

// Initial display
displayCartItems();
updateCartTotal();
