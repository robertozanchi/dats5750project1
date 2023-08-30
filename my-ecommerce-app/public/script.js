document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartItemsList = document.getElementById('cart-items');
  const checkoutButton = document.getElementById('checkout-btn'); // Get the "Checkout" button element

  addToCartButtons.forEach(button => {
    button.addEventListener('click', async event => {
      const productId = event.target.getAttribute('data-product-id');
      const response = await addToCart(productId);
      updateCartUI(response.cart);
    });
  });

  // Add event listener for the "Checkout" button
  checkoutButton.addEventListener('click', async () => {
    const response = await checkout();
    // Update UI after checkout response
    updateCartUI(response.cart);
    updateOrderTotal(response.orderTotal); // Update the displayed order total
  });

  async function addToCart(productId) {
    const response = await fetch('/api/add-to-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    });
    return response.json();
  }

  async function checkout() {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    const data = await response.json();
  
    // Update the UI with the order total
    const orderTotalElement = document.getElementById('order-total');
    orderTotalElement.textContent = `Order Total: $${data.orderTotal}`;
  
    return data;
  }

  function updateCartUI(cartItems) {
    cartItemsList.innerHTML = '';
    cartItems.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${getProductName(item.id)} - $${item.price}`;
      cartItemsList.appendChild(li);
    });
  }
  
  // Function to get the product name based on the product id
function getProductName(productId) {
  if (productId === '1') {
    return 'Comforter'; // Replace with your desired product name
  } else if (productId === '2') {
    return 'Cover'; // Replace with your desired product name
  } else {
    return 'Unknown Product'; // Default product name if productId is not recognized
  }
}

// Update the order total in the UI
function updateOrderTotal(total) {
  const orderTotalElement = document.getElementById('order-total');
  orderTotalElement.textContent = `Order Total: $${total}`;
}
});