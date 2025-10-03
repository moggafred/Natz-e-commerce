const checkoutForm = document.getElementById('checkout-form');
const paymentMethodSelect = document.getElementById('payment-method-select');
const creditCardForm = document.getElementById('credit-card-form');
const mobileMoneyForm = document.getElementById('mobile-money-form');
const orderConfirmationModalContainer = document.getElementById('order-confirmation-modal-container');

if (paymentMethodSelect) {
    paymentMethodSelect.addEventListener('change', () => {
        if (paymentMethodSelect.value === 'mobile-money') {
            creditCardForm.style.display = 'none';
            mobileMoneyForm.style.display = 'block';
        } else if (paymentMethodSelect.value === 'paypal') {
            creditCardForm.style.display = 'none';
            mobileMoneyForm.style.display = 'none';
        }
        else {
            creditCardForm.style.display = 'block';
            mobileMoneyForm.style.display = 'none';
        }
    });
}

if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (checkoutForm.checkValidity()) {
            fetch('order-confirmation-modal.html')
                .then(response => response.text())
                .then(html => {
                    orderConfirmationModalContainer.innerHTML = html;
                    const modal = document.getElementById('order-confirmation-modal');
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

                    const confirmOrderBtn = document.getElementById('confirm-order-btn');
                    confirmOrderBtn.onclick = function() {
                        // In a real application, you would send the order to the server.
                        alert('Order placed successfully!');
                        localStorage.removeItem('cart');
                        window.location.href = 'index.html';
                    }

                    const cancelOrderBtn = document.getElementById('cancel-order-btn');
                    cancelOrderBtn.onclick = function() {
                        modal.style.display = 'none';
                    }
                });
        } else {
            alert('Please fill out all required fields.');
        }
    });
}
