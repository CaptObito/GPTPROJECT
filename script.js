// Toggle Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// Mobile Menu Toggle
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('active');
}

// Scroll To Top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Placeholder fungsi untuk typewriter (saat ini diatur lewat CSS)
function startTypewriter() {
  // Jika ingin menggunakan JavaScript, tambahkan logika di sini.
}

// Fungsi lainnya bisa dikembangkan saat integrasi lebih lanjut.

// Fungsi untuk mengambil data cryptocurrency top 10 secara real-time
async function fetchCryptoData() {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");
    const data = await response.json();
    updateCryptoDashboard(data);
  } catch (error) {
    console.error("Error fetching crypto data:", error);
  }
}

// Fungsi untuk mengupdate DOM dengan data cryptocurrency
function updateCryptoDashboard(data) {
  const cryptoContainer = document.getElementById("cryptoContainer");
  cryptoContainer.innerHTML = ""; // Bersihkan data sebelumnya
  data.forEach(coin => {
    const coinDiv = document.createElement("div");
    coinDiv.className = "crypto-widget";
    coinDiv.innerHTML = `
      <h3>${coin.name} (${coin.symbol.toUpperCase()})</h3>
      <p>Price: $${coin.current_price.toLocaleString()}</p>
      <p>Market Cap: $${coin.market_cap.toLocaleString()}</p>
    `;
    cryptoContainer.appendChild(coinDiv);
  });
}

// Panggil fetchCryptoData setiap 60 detik untuk update otomatis
setInterval(fetchCryptoData, 60000);
fetchCryptoData();