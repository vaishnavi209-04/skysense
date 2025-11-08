import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
console.log("Loaded API key:", process.env.OPENWEATHER_KEY);


const app = express();
app.use(cors());
app.use(express.json());

// API route to fetch weather
app.get("/api/weather/:city", async (req, res) => {
  const { city } = req.params;
  const apiKey = process.env.OPENWEATHER_KEY;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    res.json(response.data);
  } catch (error) {
    console.error("❌ API Error:", error.response?.data || error.message);
    const status = error.response?.status || 500;
    res.status(status).json({
      error:
        error.response?.data?.message || "City not found or API error",
    });
  }
});

// 🌦️ 3-Day Forecast Route
app.get("/api/forecast/:city", async (req, res) => {
  const { city } = req.params;
  const apiKey = process.env.OPENWEATHER_KEY;

  try {
    // OpenWeather 5-day forecast gives data every 3 hours; we'll pick one per day.
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );

    // Extract one forecast roughly every 24h (8 * 3h intervals)
    const list = response.data.list.filter((_, index) => index % 8 === 0).slice(0, 3);

    res.json({
      city: response.data.city.name,
      forecast: list.map((item) => ({
        date: item.dt_txt,
        temp: item.main.temp,
        condition: item.weather[0].main,
        description: item.weather[0].description,
      })),
    });
  } catch (error) {
    console.error("❌ Forecast API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Unable to fetch forecast data" });
  }
});


// 🖼️ Get background image from Unsplash
app.get("/api/background/:query", async (req, res) => {
  const { query } = req.params;
  const apiKey = process.env.UNSPLASH_KEY;

  try {
    const response = await axios.get(
      `https://api.unsplash.com/photos/random?query=${query}&orientation=landscape&client_id=${apiKey}`
    );
    res.json({ imageUrl: response.data.urls.full });
  } catch (error) {
    console.error("❌ Unsplash Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch background image" });
  }
});




const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
