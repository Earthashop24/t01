// Load cart items from localStorage
const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
const cartContainer = document.querySelector('.cart-items');
const totalItemsElement = document.getElementById('total-items');
const totalPriceElement = document.getElementById('total-price');

let totalItems = 0;
let totalPrice = 0;

// Display items in cart
cartItems.forEach((item) => {
    totalItems++;
    totalPrice += item.price;

    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
            <h3>${item.name}</h3>
            <p>Price: ₹${item.price}</p>
        </div>
    `;
    cartContainer.appendChild(cartItem);
});

// Update cart summary
totalItemsElement.textContent = totalItems;
totalPriceElement.textContent = totalPrice;

// Checkout button functionality
document.getElementById('checkout-btn').addEventListener('click', () => {
    alert('Proceeding to checkout!');
    localStorage.removeItem('cart'); // Clear cart after checkout
    window.location.href = 'checkout.html'; // Redirect to a checkout page
});
