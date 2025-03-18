require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files dari folder "public"
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;

// ==========================
// Endpoint Proxy untuk GNews
// ==========================
app.get("/api/news", async (req, res) => {
  try {
    const gnewsApiKey = process.env.GNEWS_API_KEY;
    // Ubah query sesuai keinginan (misalnya, "crypto" atau "blockchain")
    const query = "crypto";
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&country=us&max=10&apikey=${gnewsApiKey}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching news:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// ==========================
// Endpoint Proxy untuk ChatGPT (OpenAI)
// ==========================
app.post("/api/chat", async (req, res) => {
  try {
    const openaiApiKey = process.env.OPENAI_API_KEY;
    const messages = req.body.messages || [];
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo", // atau "gpt-4o" jika sudah tersedia
        messages
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${openaiApiKey}`
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error calling ChatGPT:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to communicate with ChatGPT" });
  }
});

// ==========================
// Jalankan Server
// ==========================
app.listen(PORT, () => {
  console.log(`GPTPROJECT server running on http://localhost:${PORT}`);
});