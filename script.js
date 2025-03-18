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

// BLOCKCHAIN & SECURITY FUNCTIONS

// Fungsi untuk menghubungkan wallet menggunakan Web3 (Simulasi)
async function connectWallet() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const walletAddress = accounts[0];
      document.getElementById('walletAddress').textContent = walletAddress;
      document.getElementById('walletBalance').textContent = "2500"; // Simulasi saldo token
      updateTokenPrice();
      document.getElementById('walletInfo').style.display = 'block';
    } catch (error) {
      alert("Error connecting wallet: " + error.message);
    }
  } else {
    alert("MetaMask is not available. Please install it to connect your wallet.");
  }
}

// Fungsi untuk mengambil harga token dari API Coingecko (Simulasi Real-Time)
function updateTokenPrice() {
  fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
    .then(response => response.json())
    .then(data => {
      if (data.ethereum && data.ethereum.usd) {
        document.getElementById('tokenPrice').textContent = "$" + data.ethereum.usd;
      }
    })
    .catch(error => console.error("Error fetching token price:", error));
}

// Fungsi Enhanced 2FA (Simulasi TOTP)
function initiate2FA() {
  const code = prompt("Enter your 6-digit TOTP code (simulated):");
  if (code === "654321") {
    alert("Enhanced 2FA enabled successfully!");
    document.getElementById('securityStatus').textContent = "Enhanced 2FA is active.";
  } else {
    alert("Invalid code. Please try again.");
  }
}

// Fungsi simulasi Anti-DDoS Monitoring
function simulateAntiDDoS() {
  const random = Math.random();
  if (random > 0.8) {
    document.getElementById('securityStatus').textContent = "Warning: High traffic detected. Security protocols activated.";
  } else {
    document.getElementById('securityStatus').textContent = "Security Status: All systems normal.";
  }
}

// Fungsi untuk mendapatkan reward badge (Simulasi)
function earnReward() {
  alert("You have earned the Security Star badge!");
  document.getElementById('rewardBadge').style.display = 'block';
}

// -------------------
// SECURITY & GAMIFICATION FUNCTIONS
// -------------------

// Fungsi Enhanced 2FA (Simulasi TOTP)
function initiate2FA() {
  const code = prompt("Enter your 6-digit TOTP code (simulated):");
  if (code === "654321") {
    alert("Enhanced 2FA enabled successfully!");
    document.getElementById('securityStatus').textContent = "Enhanced 2FA is active.";
  } else {
    alert("Invalid code. Please try again.");
  }
}

// Fungsi simulasi Anti-DDoS Monitoring
function simulateAntiDDoS() {
  const random = Math.random();
  if (random > 0.8) {
    document.getElementById('securityStatus').textContent = "Warning: High traffic detected. Security protocols activated.";
  } else {
    document.getElementById('securityStatus').textContent = "Security Status: All systems normal.";
  }
}

// Fungsi untuk mendapatkan reward badge (Simulasi)
function earnReward() {
  alert("You have earned the Security Star badge!");
  document.getElementById('rewardBadge').style.display = 'block';
}

// --- Gamification: Simulasi sistem leveling dan poin ---
let userPoints = 0;
let userLevel = 1;

function gainPoints() {
  // Simulasikan penambahan poin
  const pointsEarned = Math.floor(Math.random() * 100) + 1; // Dapatkan poin antara 1 dan 100
  userPoints += pointsEarned;
  
  // Cek jika user mencapai threshold untuk naik level
  if (userPoints >= userLevel * 500) {
    userLevel++;
    alert("Congratulations! You've leveled up to Level " + userLevel);
  }
  
  // Update tampilan level dan poin
  document.getElementById('userPoints').textContent = userPoints;
  document.getElementById('userLevel').textContent = userLevel;
  alert("You earned " + pointsEarned + " points!");
}