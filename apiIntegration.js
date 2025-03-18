// apiIntegration.js

// ==============================
// ChatGPT API Integration
// ==============================
async function fetchChatGPTResponse(context) {
  // Ambil API key dari environment variable (gunakan file .env dan dotenv di backend)
  // Jika tidak, ganti dengan API key kamu secara langsung (tidak disarankan untuk produksi)
  const apiKey = process.env.OPENAI_API_KEY || "YOUR_API_KEY_HERE"; 
  const url = "https://api.openai.com/v1/chat/completions";
  
  const data = {
    model: "gpt-3.5-turbo", // atau model lain yang kamu inginkan
    messages: context      // context adalah array pesan, misal: [{role:"user", content:"Halo"}]
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

// ==============================
// Coingecko API Integration (Live Price Action)
// ==============================
async function fetchLiveCryptoPrices() {
  // Mengambil data harga top 10 crypto (USD) dari Coingecko
  const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data; // Kembalikan array data coin
  } catch (error) {
    console.error("Error fetching crypto prices:", error);
    return [];
  }
}

// Contoh ekspor fungsi (jika menggunakan modul ES)
export { fetchChatGPTResponse, fetchLiveCryptoPrices };