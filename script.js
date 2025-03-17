// Jalankan fungsi saat DOM telah dimuat
document.addEventListener('DOMContentLoaded', () => {
  startTypewriter();
  // Cek apakah user sudah login melalui localStorage
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (loggedInUser) {
    document.getElementById('usernameDisplay').textContent = loggedInUser;
    document.getElementById('dashboard').style.display = 'block';
  }
  // Siapkan konteks untuk chatbot
  if (!localStorage.getItem('chatContext')) {
    localStorage.setItem('chatContext', JSON.stringify([]));
  }
});

// TYPEWRITER EFFECT
const typewriterText = "The Future of AI, Blockchain & Cyber Security";
let i = 0;
function startTypewriter() {
  if (i < typewriterText.length) {
    document.querySelector('.typewriter').textContent += typewriterText.charAt(i);
    i++;
    setTimeout(startTypewriter, 100);
  }
}

// DARK MODE TOGGLE
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// MOBILE MENU TOGGLE
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('active');
}

// SCROLL TO TOP
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// MODAL FUNCTIONS
function openModal() {
  document.getElementById('infoModal').style.display = 'block';
}
function closeModal() {
  document.getElementById('infoModal').style.display = 'none';
}
function openLoginModal() {
  document.getElementById('loginModal').style.display = 'block';
}
function closeLoginModal() {
  document.getElementById('loginModal').style.display = 'none';
}

// LOGIN FUNCTIONALITY
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  if (username && password) {
    localStorage.setItem('loggedInUser', username);
    document.getElementById('usernameDisplay').textContent = username;
    document.getElementById('dashboard').style.display = 'block';
    closeLoginModal();
  } else {
    alert("Please enter valid credentials.");
  }
});
function logout() {
  localStorage.removeItem('loggedInUser');
  document.getElementById('dashboard').style.display = 'none';
}

// FADE-IN ON SCROLL
document.addEventListener('scroll', () => {
  const fadeElements = document.querySelectorAll('.fade-in');
  const screenHeight = window.innerHeight;
  fadeElements.forEach(el => {
    const position = el.getBoundingClientRect().top;
    if (position < screenHeight - 50) {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
      el.style.transition = '1s ease-out';
    }
  });
});

// CHATBOT FUNCTIONS WITH ChatGPT API INTEGRATION
async function sendChat() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  if (message !== "") {
    appendChatMessage("User", message);
    let context = JSON.parse(localStorage.getItem('chatContext'));
    context.push({ role: "user", content: message });
    localStorage.setItem('chatContext', JSON.stringify(context));

    // Kirim pesan ke ChatGPT API
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

// Fungsi untuk menghubungkan dengan ChatGPT API
async function sendChatWithChatGPT(context) {
  const apiKey = process.env.OPENAI_API_KEY || "AKUCINTAKAMU"; // Pastikan kamu telah mengatur API key dengan aman
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

// VOICE INPUT USING WEB SPEECH API
function startVoiceInput() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Voice recognition is not supported in your browser.");
    return;
  }
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.start();
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById('chatInput').value = transcript;
  };
}

// BLOCKCHAIN & SECURITY FUNCTIONS
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
function earnReward() {
  alert("You have earned the Security Star badge!");
  document.getElementById('rewardBadge').style.display = 'block';
}

// Fungsi untuk mengirim pesan ke ChatGPT API
async function sendChatWithChatGPT(context) {
  // Ambil API key dari environment variable atau langsung pakai string (jangan lakukan ini di produksi!)
  const apiKey = process.env.OPENAI_API_KEY || "AKUCINTAKAMU";  
  const url = "https://api.openai.com/v1/chat/completions";
  
  const data = {
    model: "gpt-4.0-turbo", // Atau model lain sesuai kebutuhan
    messages: context // Context adalah array pesan, misalnya: [{ role: "user", content: "Hello" }]
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
      return "Maaf, saya tidak dapat memproses permintaan Anda saat ini.";
    }
  } catch (error) {
    console.error("Error communicating with ChatGPT API:", error);
    return "Terjadi kesalahan saat menghubungkan ke AI.";
  }
}

// Fungsi untuk mengirim chat (dipanggil saat tombol 'Send' diklik)
async function sendChat() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  if (message !== "") {
    appendChatMessage("User", message);
    // Ambil konteks chat yang sudah ada, atau inisialisasi array kosong
    let context = JSON.parse(localStorage.getItem('chatContext')) || [];
    context.push({ role: "user", content: message });
    localStorage.setItem('chatContext', JSON.stringify(context));
    
    // Kirim pesan ke ChatGPT API dan ambil responsnya
    const response = await sendChatWithChatGPT(context);
    appendChatMessage("Bot", response);
    context.push({ role: "assistant", content: response });
    localStorage.setItem('chatContext', JSON.stringify(context));
    
    input.value = "";
  }
}

// Fungsi untuk menampilkan pesan di jendela chat
function appendChatMessage(sender, message) {
  const chatWindow = document.getElementById('chatWindow');
  const msgDiv = document.createElement('div');
  msgDiv.className = 'chat-message';
  msgDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Fungsi untuk input suara menggunakan Web Speech API
function startVoiceInput() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Voice recognition is not supported in your browser.");
    return;
  }
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.start();
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById('chatInput').value = transcript;
  };
}

// BLOCKCHAIN & SECURITY FUNCTIONS

// Fungsi untuk menghubungkan wallet menggunakan Web3 (simulasi)
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

// Fungsi untuk mengupdate harga token dari API Coingecko (simulasi real-time)
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

// Fungsi Enhanced 2FA (simulasi TOTP)
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

// Fungsi untuk mendapatkan reward badge (simulasi)
function earnReward() {
  alert("You have earned the Security Star badge!");
  document.getElementById('rewardBadge').style.display = 'block';
}