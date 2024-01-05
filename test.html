<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shopping Cart</title>
    <style>
        /* Add your CSS styles here */
    </style>
</head>
<body>
    <h1>Shopping Cart</h1>

    <div id="products">
        <!-- Product listing goes here -->
        <div class="product" data-id="1" data-name="Product 1" data-price="10.00">
            <h3>Product 1</h3>
            <p>Price: $10.00</p>
            <button onclick="addToCart(1)">Add to Cart</button>
        </div>

        <div class="product" data-id="2" data-name="Product 2" data-price="20.00">
            <h3>Product 2</h3>
            <p>Price: $20.00</p>
            <button onclick="addToCart(2)">Add to Cart</button>
        </div>
    </div>

    <div id="cart">
        <h2>Shopping Cart</h2>
        <ul id="cart-items">
            <!-- Cart items will be displayed here -->
        </ul>
        <p>Total: $<span id="total">0.00</span></p>
    </div>

    <script>
        // JavaScript logic for the shopping cart
        let cart = [];

        function addToCart(productId) {
            const product = document.querySelector(`.product[data-id="${productId}"]`);
            const id = product.dataset.id;
            const name = product.dataset.name;
            const price = parseFloat(product.dataset.price);

            const existingItem = cart.find(item => item.id === id);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ id, name, price, quantity: 1 });
            }

            updateCart();
        }

        function updateCart() {
            const cartItemsElement = document.getElementById('cart-items');
            const totalElement = document.getElementById('total');
            let total = 0;

            cartItemsElement.innerHTML = '';

            cart.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
                cartItemsElement.appendChild(li);
                total += item.price * item.quantity;
            });

            totalElement.textContent = total.toFixed(2);
        }
    </script>
</body>
</html>
