// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function () {

  // Initialize cart as an empty array
  let cart = [];

  // Function to update cart display and price
  function updateCart() {
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    cartCount.textContent = cart.length;
    
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    cartTotal.textContent = `Total: Rp ${totalPrice.toLocaleString()}`;
  }

  // Add item to the cart
  function addToCart(productId, productName, productPrice) {
    const item = {
      id: productId,
      name: productName,
      price: productPrice
    };
    cart.push(item);
    updateCart();
    alert(`${productName} berhasil ditambahkan ke keranjang!`);
  }

  // Event listener for the Buy buttons
  const buyButtons = document.querySelectorAll('.buy-btn');
  buyButtons.forEach(button => {
    button.addEventListener('click', function () {
      const productId = this.getAttribute('data-id');
      const productName = this.previousElementSibling.previousElementSibling.textContent;
      const productPrice = parseInt(this.previousElementSibling.textContent.replace('Rp ', '').replace('.', ''), 10);
      addToCart(productId, productName, productPrice);
    });
  });

  // Form validation and checkout process
  const checkoutForm = document.getElementById('checkoutForm');
  checkoutForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validate if cart is empty
    if (cart.length === 0) {
      alert("Keranjang kosong! Silakan pilih produk untuk checkout.");
      return;
    }

    // Validate form fields
    const userID = document.getElementById('userID').value.trim();
    const serverID = document.getElementById('serverID').value.trim();
    const diamondPack = document.getElementById('diamondPack').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    const email = document.getElementById('email').value.trim();

    if (!userID || !serverID || !diamondPack || !paymentMethod || !email) {
      alert("Harap lengkapi semua informasi!");
      return;
    }

    // Show checkout confirmation
    alert(`
      Pembelian berhasil!\n\n
      ID Pemain: ${userID}\n
      Server: ${serverID}\n
      Produk: ${diamondPack}\n
      Metode Pembayaran: ${paymentMethod}\n
      Total: Rp ${cart.reduce((total, item) => total + item.price, 0).toLocaleString()}\n
      Email: ${email}
    `);

    // Clear the cart after checkout
    cart = [];
    updateCart();
    checkoutForm.reset();
  });

  // Dynamic product price updates for checkout form
  const diamondPackSelect = document.getElementById('diamondPack');
  diamondPackSelect.addEventListener('change', function () {
    const selectedOption = this.options[this.selectedIndex];
    const price = parseInt(selectedOption.textContent.split('Rp')[1].trim().replace('.', ''), 10);
    document.getElementById('checkoutTotal').textContent = `Total: Rp ${price.toLocaleString()}`;
  });

  // Toggle cart visibility
  const cartButton = document.getElementById('cart-button');
  const cartModal = document.getElementById('cart-modal');
  cartButton.addEventListener('click', function () {
    cartModal.classList.toggle('show');
  });

  // Render the cart modal with items and their total price
  function renderCartModal() {
    const cartModalContent = document.getElementById('cart-modal-content');
    cartModalContent.innerHTML = ''; // Clear the modal content

    if (cart.length === 0) {
      cartModalContent.innerHTML = '<p>Keranjang kosong!</p>';
    } else {
      cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
          <p>${item.name}</p>
          <p>Rp ${item.price.toLocaleString()}</p>
        `;
        cartModalContent.appendChild(itemDiv);
      });
    }

    updateCart();
  }

  // Update cart when modal is shown
  cartModal.addEventListener('show', renderCartModal);
  
  // Event listener for removing items from cart
  document.getElementById('remove-from-cart').addEventListener('click', function () {
    const lastItem = cart.pop(); // Remove the last item
    alert(`${lastItem.name} telah dihapus dari keranjang.`);
    renderCartModal();
  });

  // Cart modal close functionality
  document.getElementById('close-cart').addEventListener('click', function () {
    cartModal.classList.remove('show');
  });

  // Initialization: Update cart on page load
  updateCart();

});