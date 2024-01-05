let cart = [];

function addToCart(testId) {
    const testRow = document.querySelector(`.test[data-id="${testId}"]`);
    const id = testRow.dataset.id;
    const name = testRow.querySelector('.test-name').innerText;
    const price = parseFloat(testRow.dataset.price);

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    const cartIcon = document.getElementById('cart-icon');
    const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartIcon.innerHTML = `<a href="cart.html">🛒 ${cartItemCount > 0 ? cartItemCount : ''}</a>`;

    // Update the cart items on cart.html
    const cartItemsContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('total');

    // Clear previous items
    cartItemsContainer.innerHTML = '';

    // Populate the cart items
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} x${item.quantity}`;
        cartItemsContainer.appendChild(listItem);
    });

    // Calculate and display total price
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    totalContainer.textContent = totalPrice.toFixed(2);
}

// Ensure that the cart is updated when the page loads
updateCart();
