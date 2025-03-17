// Jalankan fungsi saat DOM telah dimuat
document.addEventListener('DOMContentLoaded', () => {
  startTypewriter();
  // Cek apakah user sudah login dari localStorage
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (loggedInUser) {
    document.getElementById('usernameDisplay').textContent = loggedInUser;
    document.getElementById('dashboard').style.display = 'block';
  }
});

// TYPEWRITER EFFECT
const typewriterText = "The Future of AI & Cyber Tech";
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

// CHATBOT FUNCTIONS
function sendChat() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  if (message !== "") {
    appendChatMessage("User", message);
    setTimeout(() => {
      appendChatMessage("Bot", "Thank you for your message! Our AI is continuously learning.");
    }, 1000);
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

// VOICE INPUT (WEB SPEECH API)
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

// BLOCKCHAIN & SECURITY FUNCTIONS (Tahap 1 simulasi dasar)
async function connectWallet() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const walletAddress = accounts[0];
      document.getElementById('walletAddress').textContent = walletAddress;
      document.getElementById('walletBalance').textContent = "2500";
      document.getElementById('walletInfo').style.display = 'block';
    } catch (error) {
      alert("Error connecting wallet: " + error.message);
    }
  } else {
    alert("MetaMask is not available. Please install it to connect your wallet.");
  }
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