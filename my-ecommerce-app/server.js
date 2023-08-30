const express = require('express');
const app = express();
const path = require('path');

const cart = []; // Cart array to store added items

app.use(express.static('public'));
app.use(express.json());

app.post('/api/add-to-cart', (req, res) => {
  const { productId } = req.body;
  const product = {
    id: productId,
    name: getProductName(productId), // Use the function to get the product name
    price: getProductPrice(productId)
  };
  cart.push(product);
  res.json({ message: 'Product added to cart', cart });
});

// Calculate the price based on productId
function getProductPrice(productId) {
  if (productId === '1') {
    return 150; // Product 1 price
  } else if (productId === '2') {
    return 200; // Product 2 price
  } else {
    return 0; // Default price if productId is not recognized
  }
}

// Define a function to get the product name based on the productId
function getProductName(productId) {
  if (productId === '1') {
    return 'Cotton Comforter';
  } else if (productId === '2') {
    return 'Linen Cover';
  } else {
    return 'Unknown Product';
  }
}

app.get('/api/cart', (req, res) => {
  res.json({ cart });
});

app.post('/api/checkout', (req, res) => {
  const cartItems = cart.slice();
  const total = calculateTotal(cartItems);
  cart.length = 0;
  res.json({ message: 'Checkout successful', orderTotal: total });
});

// Calculate the total cost of items in the cart
function calculateTotal(cartItems) {
  return cartItems.reduce((total, item) => total + item.price, 0);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Define a default route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve the server-side script only when requested by the server
app.get('/server.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'server.js'));
});
