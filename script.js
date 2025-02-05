// script.js

// Wait for the DOM to load completely
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart count and cart items
    let cartCount = 0;
    const cartItems = [];

    // Select all "Add to Cart" buttons and product cards
    const addToCartButtons = document.querySelectorAll('.btn-add');
    const productCards = document.querySelectorAll('.product-card');

    
    // Add click event listeners to "Add to Cart" buttons
    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Increment cart count
            cartCount++;
            // Get product details
            const productCard = productCards[index];
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('p').textContent;

            // Add product to cart items
            cartItems.push({ name: productName, price: productPrice });

            // Update the cart counter
            cartCounter.textContent = `Cart: ${cartCount}`;

            // Show confirmation message
            alert(`${productName} added to cart!`);
        });
    });

    // Checkout functionality
    checkoutButton.addEventListener('click', () => {
        if (cartItems.length === 0) {
            alert('Your cart is empty. Add items before checking out!');
            return;
        }

        // Create a summary of cart items
        let cartSummary = 'Checkout Summary:\n\n';
        cartItems.forEach((item, index) => {
            cartSummary += `${index + 1}. ${item.name} - ${item.price}\n`;
        });

        // Calculate total price
        const totalPrice = cartItems.reduce((total, item) => {
            return total + parseFloat(item.price.replace('$', ''));
        }, 0);

        cartSummary += `\nTotal Price: $${totalPrice.toFixed(2)}`;

        // Show cart summary
        alert(cartSummary);

        // Reset cart
        cartCount = 0;
        cartItems.length = 0;
        cartCounter.textContent = `Cart: ${cartCount}`;
        alert('Thank you for your purchase!');
    });
});
const slides = document.querySelectorAll('.hero-content');
let currentIndex = 0;

function showNextSlide() {
  // Hide current slide
  slides[currentIndex].classList.remove('active');

  // Update index for the next slide
  currentIndex = (currentIndex + 1) % slides.length;

  // Show next slide
  slides[currentIndex].classList.add('active');
}

// Change slide every 3 seconds
setInterval(showNextSlide, 5000);

const cart = [];

// Add to Cart button functionality
document.querySelectorAll('.btn-add').forEach((button, index) => {
    button.addEventListener('click', () => {
        const productCard = button.parentElement;
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('p').textContent.replace(/[^0-9]/g, '');
        const productImage = productCard.querySelector('img').src;

        // Add product to cart array
        cart.push({
            name: productName,
            price: parseInt(productPrice),
            image: productImage,
        });

        alert(`${productName} has been added to your cart!`);
        localStorage.setItem('cart', JSON.stringify(cart));
    });
});

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Serve Static Files
app.use(express.static('public'));

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
