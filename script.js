function selectProduct(productName, price) {
  document.getElementById('selectedProduct').value = productName;
  document.getElementById('selectedPrice').value = `Rp ${price.toLocaleString('id-ID')}`;
  window.location.href = "#checkout"; // Scroll otomatis ke checkout
}

document.getElementById('formCheckout')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const userId = document.getElementById('userId').value;
  const serverId = document.getElementById('serverId').value;
  const product = document.getElementById('selectedProduct').value;
  const price = document.getElementById('selectedPrice').value;
  const payment = document.getElementById('paymentMethod').value;

  if (userId && serverId && product && price && payment) {
    alert(`Pembayaran berhasil!\n\nUser ID: ${userId}\nServer ID: ${serverId}\nProduk: ${product}\nHarga: ${price}\nPembayaran: ${payment}`);
  } else {
    alert('Isi semua data dengan lengkap!');
  }
});