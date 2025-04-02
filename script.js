// script.js

document.addEventListener('DOMContentLoaded', () => {
  startTypewriter();
  setupAccordion();
  fetchLivePriceAction();
  fetchNews();
  setInterval(fetchLivePriceAction, 1000); // Update live price setiap 1 detik
  setInterval(fetchNews, 300000); // Refresh berita tiap 5 menit
});

// Navigation & Dark Mode
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('active');
}
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// Typewriter Effect
let i = 0;
const typewriterText = "Top-Up Mobile Legends Futuristik";
function startTypewriter() {
  const typeEl = document.querySelector('.typewriter');
  if (i < typewriterText.length) {
    typeEl.textContent += typewriterText.charAt(i);
    i++;
    setTimeout(startTypewriter, 100);
  }
}

// Accordion FAQ
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

// Live Price Action (Crypto) menggunakan Binance API
let oldPrices = {};
async function fetchLivePriceAction() {
  try {
    const response = await fetch("https://api.binance.com/api/v3/ticker/price");
    const data = await response.json();
    const top10 = data.slice(0, 10);
    updatePriceList(top10);
  } catch (error) {
    console.error("Error fetching live price data:", error);
  }
}
function updatePriceList(coins) {
  const priceList = document.getElementById("priceList");
  priceList.innerHTML = "";
  coins.forEach(coin => {
    const oldPrice = oldPrices[coin.symbol] || parseFloat(coin.price);
    const currentPrice = parseFloat(coin.price);
    const priceChange = currentPrice - oldPrice;
    let changeClass = "";
    if (priceChange > 0) changeClass = "price-change-up";
    else if (priceChange < 0) changeClass = "price-change-down";
    oldPrices[coin.symbol] = currentPrice;
    const coinDiv = document.createElement("div");
    coinDiv.className = "price-item";
    coinDiv.innerHTML = `
      <h3>${coin.symbol}</h3>
      <p>Price: $${currentPrice.toFixed(2)}</p>
      <p class="${changeClass}">Change: ${priceChange.toFixed(4)}</p>
    `;
    priceList.appendChild(coinDiv);
  });
}

// News Integration
async function fetchNews() {
  try {
    const response = await fetch("/api/news");
    const data = await response.json();
    updateNewsSection(data.articles || []);
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}
function updateNewsSection(articles) {
  const newsContainer = document.getElementById("newsContainer");
  newsContainer.innerHTML = "";
  articles.forEach(article => {
    const newsDiv = document.createElement("div");
    newsDiv.className = "news-item";
    newsDiv.innerHTML = `
      <h3>${article.title}</h3>
      <p>${article.description || ""}</p>
      <a href="${article.url}" target="_blank">Read more</a>
    `;
    newsContainer.appendChild(newsDiv);
  });
}

// Blockchain & Security (Simulated)
async function connectWallet() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const walletAddress = accounts[0];
      document.getElementById('walletAddress').textContent = walletAddress;
      document.getElementById('walletBalance').textContent = "2500";
      updateTokenPrice();
      document.getElementById('walletInfo').style.display = 'block';
    } catch (error) {
      alert("Error connecting wallet: " + error.message);
    }
  } else {
    alert("MetaMask is not available. Please install it.");
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

// Chatbot (GPT-based)
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
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: context })
    });
    const data = await response.json();
    if (data.choices && data.choices[0]) {
      return data.choices[0].message.content;
    } else {
      return "Sorry, I couldn't process your request.";
    }
  } catch (error) {
    console.error("Error communicating with ChatGPT API:", error);
    return "An error occurred while communicating with the AI.";
  }
}