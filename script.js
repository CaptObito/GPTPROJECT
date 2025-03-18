// Jalankan fungsi saat DOM telah dimuat
document.addEventListener('DOMContentLoaded', () => {
  startTypewriter();
  setupAccordion();

  // Cek apakah user sudah login
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (loggedInUser) {
    // Tampilkan dashboard atau data lain
  }

  // Panggil fetch pertama kali untuk live price
  fetchLivePriceAction();
  // Interval 1 detik (1000 ms)
  setInterval(fetchLivePriceAction, 1000);
});

// -------------------
// NAVIGATION & DARK MODE
// -------------------
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('active');
}
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// -------------------
// HERO SECTION (Typewriter)
let i = 0;
const typewriterText = "Bloomberg-like Futuristic Platform";
function startTypewriter() {
  const typewriterEl = document.querySelector('.typewriter');
  if (i < typewriterText.length) {
    typewriterEl.textContent += typewriterText.charAt(i);
    i++;
    setTimeout(startTypewriter, 100);
  }
}

// -------------------
// ACCORDION FAQ
// -------------------
function setupAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const title = item.querySelector('.accordion-title');
    title.addEventListener('click', () => {
      const content = item.querySelector('.accordion-content');
      const isOpen = content.classList.contains('show');
      document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('show'));
      if (!isOpen) {
        content.classList.add('show');
      }
    });
  });
}

// -------------------
// LIVE PRICE ACTION - SETIAP DETIK
// -------------------
let oldPrices = {};
async function fetchLivePriceAction() {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");
    const data = await response.json();
    updatePriceList(data);
  } catch (error) {
    console.error("Error fetching live price data:", error);
  }
}
function updatePriceList(coins) {
  const priceList = document.getElementById("priceList");
  priceList.innerHTML = "";

  coins.forEach(coin => {
    const oldPrice = oldPrices[coin.id] || coin.current_price;
    const priceChange = coin.current_price - oldPrice;
    
    let changeClass = "";
    if (priceChange > 0) changeClass = "price-change-up";
    else if (priceChange < 0) changeClass = "price-change-down";

    oldPrices[coin.id] = coin.current_price;

    const coinDiv = document.createElement("div");
    coinDiv.className = "price-item";
    coinDiv.innerHTML = `
      <h3>${coin.name} (${coin.symbol.toUpperCase()})</h3>
      <p>Price: $${coin.current_price.toLocaleString()}</p>
      <p class="${changeClass}">Change: ${priceChange.toFixed(4)}</p>
    `;
    priceList.appendChild(coinDiv);
  });
}

// -------------------
// BLOCKCHAIN & SECURITY
// -------------------
async function connectWallet() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const walletAddress = accounts[0];
      document.getElementById('walletAddress').textContent = walletAddress;
      document.getElementById('walletBalance').textContent = "2500"; // Simulasi saldo
      updateTokenPrice();
      document.getElementById('walletInfo').style.display = 'block';
    } catch (error) {
      alert("Error connecting wallet: " + error.message);
    }
  } else {
    alert("MetaMask is not available. Please install it to connect your wallet.");
  }
}
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
function initiate2FA() {
  const code = prompt("Enter your 6-digit TOTP code (simulated):");
  if (code === "654321") {
    alert("Enhanced 2FA enabled successfully!");
    document.getElementById('securityStatus').textContent = "Enhanced 2FA is active.";
  } else {
    alert("Invalid code. Please try again.");
  }
}
function simulateAntiDDoS() {
  const random = Math.random();
  if (random > 0.8) {
    document.getElementById('securityStatus').textContent = "Warning: High traffic detected. Security protocols activated.";
  } else {
    document.getElementById('securityStatus').textContent = "Security Status: All systems normal.";
  }
}
function earnReward() {
  alert("You have earned the Security Star badge!");
  document.getElementById('rewardBadge').style.display = 'block';
}

// Gamification: Level & Points
let userPoints = 0;
let userLevel = 1;
function gainPoints() {
  const pointsEarned = Math.floor(Math.random() * 100) + 1;
  userPoints += pointsEarned;
  if (userPoints >= userLevel * 500) {
    userLevel++;
    alert("Congratulations! You've leveled up to Level " + userLevel);
  }
  document.getElementById('userPoints').textContent = userPoints;
  document.getElementById('userLevel').textContent = userLevel;
  alert("You earned " + pointsEarned + " points!");
}

// -------------------
// CHATBOT (GPT-based)
async function sendChat() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  if (message !== "") {
    appendChatMessage("User", message);
    let context = JSON.parse(localStorage.getItem('chatContext')) || [];
    context.push({ role: "user", content: message });
    localStorage.setItem('chatContext', JSON.stringify(context));
    
    const response = await sendChatWithChatGPT(context);
    appendChatMessage("Bot", response);
    context.push({ role: "assistant", content: response });
    localStorage.setItem('chatContext', JSON.stringify(context));
    
    input.value = "";
  }
}
function appendChatMessage(sender, message) {
  const chatWindow = document.getElementById('chatWindow');
  const msgDiv = document.createElement('div');
  msgDiv.className = 'chat-message';
  msgDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}
async function sendChatWithChatGPT(context) {
  // Ganti dengan environment variable atau langsung isi API key (tidak disarankan di produksi)
  const apiKey = "AKUCINTAKAMU"; // <-- Ganti dengan API Key
  const url = "https://api.openai.com/v1/chat/completions";
  const data = {
    model: "gpt-3.5-turbo",
    messages: context
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (result.choices && result.choices[0]) {
      return result.choices[0].message.content;
    } else {
      return "Sorry, I couldn't process your request at the moment.";
    }
  } catch (error) {
    console.error("Error communicating with ChatGPT API:", error);
    return "An error occurred while communicating with the AI.";
  }
}