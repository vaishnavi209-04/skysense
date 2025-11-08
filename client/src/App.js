import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactAnimatedWeather from "react-animated-weather";
import { FaHome } from "react-icons/fa";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [localTime, setLocalTime] = useState("");
  const [backgroundUrl, setBackgroundUrl] = useState("");
  const [unit, setUnit] = useState("metric");
  const [isHome, setIsHome] = useState(true);

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }
    setIsHome(false);
    await getWeatherByCity(city);
  };

  const getWeatherByCity = async (cityName) => {
    try {
      setError("");
      setLoading(true);

      const [weatherRes, forecastRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/weather/${cityName}`),
        axios.get(`http://localhost:5000/api/forecast/${cityName}`)
      ]);

      const mainCondition = weatherRes.data.weather[0].main;
      const imageUrl = await fetchBackgroundImage(mainCondition);

      setWeather(weatherRes.data);
      setForecast(forecastRes.data.forecast);
      updateLocalTime(weatherRes.data);
      setBackgroundUrl(imageUrl);
    } catch (err) {
      setError("City not found or API not active yet.");
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchBackgroundImage = async (query) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/background/${query}`);
      return res.data.imageUrl;
    } catch {
      return "";
    }
  };

  const updateLocalTime = (data) => {
    const offsetSeconds = data.timezone;
    const local = new Date(new Date().getTime() + offsetSeconds * 1000);
    const formatted = local.toUTCString().replace("GMT", "");
    setLocalTime(formatted);
  };

  const getWeatherIcon = (condition = "") => {
    const c = condition.toLowerCase();
    if (c.includes("cloud")) return "CLOUDY";
    if (c.includes("rain")) return "RAIN";
    if (c.includes("clear")) return "CLEAR_DAY";
    if (c.includes("snow")) return "SNOW";
    if (c.includes("storm")) return "WIND";
    return "PARTLY_CLOUDY_DAY";
  };

  const convertTemp = (tempC) => (unit === "metric" ? tempC : (tempC * 9) / 5 + 32);
  const getTempUnit = () => (unit === "metric" ? "°C" : "°F");
  const toggleUnit = () => setUnit((prev) => (prev === "metric" ? "imperial" : "metric"));

  useEffect(() => {
    if (weather) updateLocalTime(weather);
  }, [weather]);

  // 🌈 Simplified LANDING PAGE
  if (isHome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-400 to-indigo-500 flex flex-col text-white font-sans transition-all duration-700">
        {/* 🌤️ Header with only App Name */}
        <header className="flex justify-start items-center px-12 py-6">
          <h1 className="text-3xl font-bold tracking-wide">SkySense</h1>
        </header>

        {/* 🌤️ Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left px-8 md:px-24 mt-10 md:mt-0 flex-1">
          <div className="flex-1">
            <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg">
              WEATHER <br /> FORECAST
            </h2>
            <p className="text-white/90 mb-8 max-w-md">
              Explore accurate and dynamic weather forecasts.  
              Get real-time updates, interactive visuals, and a beautiful UI  
              crafted for modern users like you.
            </p>

            {/* 🌦️ Feature Blocks */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl shadow-md hover:bg-white/30 transition text-sm">
                🌍 Real-Time Weather
              </div>
              <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl shadow-md hover:bg-white/30 transition text-sm">
                📅 3-Day Forecast
              </div>
              <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl shadow-md hover:bg-white/30 transition text-sm">
                🌡️ °C / °F Toggle
              </div>
              <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl shadow-md hover:bg-white/30 transition text-sm">
                🌈 Dynamic Backgrounds
              </div>
            </div>

            {/* 🌤️ Get Started */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                placeholder="Enter your city..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="px-4 py-3 rounded-xl text-gray-800 focus:outline-none w-64 shadow-md"
              />
              <button
                onClick={fetchWeather}
                className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-100 transition transform hover:scale-105"
              >
                Get Started →
              </button>
            </div>
          </div>

          {/* 🌞 Decorative Illustration */}
          <div className="flex-1 flex justify-center mt-10 md:mt-0">
            <div className="w-64 h-64 relative">
              <div className="absolute top-8 right-8 w-32 h-32 bg-yellow-400 rounded-full blur-lg opacity-90 animate-pulse"></div>
              <div className="absolute top-0 right-0 w-28 h-28 bg-yellow-300 rounded-full animate-spin-slow"></div>
              <div className="absolute bottom-0 left-0 w-48 h-24 bg-white/40 rounded-full blur-md"></div>
              <div className="absolute bottom-8 right-12 w-36 h-16 bg-white/30 rounded-full blur-sm"></div>
            </div>
          </div>
        </div>

        {/* 💜 Footer */}
        <footer className="text-center text-white/70 py-6 text-sm">
          Built with <span className="text-red-500 animate-pulse">❤️</span> by Vaishnavi
        </footer>
      </div>
    );
  }

  // ☀️ WEATHER PAGE (unchanged)
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-white p-6 transition-all duration-700 bg-cover bg-center"
      style={{
        backgroundImage: backgroundUrl
          ? `url(${backgroundUrl})`
          : "linear-gradient(to bottom right, #38bdf8, #2563eb, #1e3a8a)",
        filter: "brightness(0.8)",
      }}
    >
      {/* 🏠 Home Icon */}
      <button
        onClick={() => {
          setIsHome(true);
          setWeather(null);
          setCity("");
        }}
        className="absolute top-5 left-5 bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/30 transition"
      >
        <FaHome size={22} color="white" />
      </button>

      <h1 className="text-5xl font-bold mb-8 tracking-wide drop-shadow-lg">SkySense</h1>

      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-3 rounded-xl text-gray-800 focus:outline-none w-64 shadow-md"
        />
        <button
          onClick={fetchWeather}
          className="bg-white text-blue-600 px-5 py-3 rounded-xl font-semibold hover:bg-blue-100 transition"
        >
          Search
        </button>
        {weather && (
          <button
            onClick={toggleUnit}
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
          >
            Switch to {unit === "metric" ? "°F" : "°C"}
          </button>
        )}
      </div>

      {loading && <p className="text-white text-lg">Fetching weather data...</p>}
      {error && <p className="text-red-200 mb-4">{error}</p>}

      {weather && (
        <div className="bg-white/20 backdrop-blur-lg p-6 rounded-3xl shadow-xl text-center max-w-md w-full transition-all mb-6">
          <div className="flex justify-center mb-3">
            <ReactAnimatedWeather
              icon={getWeatherIcon(weather.weather[0].main)}
              color="#fff"
              size={80}
              animate={true}
            />
          </div>

          <h2 className="text-3xl font-semibold mb-2">{weather.name}</h2>
          {localTime && (
            <p className="text-md italic mb-4 text-white/80">🕒 {localTime}</p>
          )}

          <p className="text-lg mb-1">
            🌡️ Temp: {Math.round(convertTemp(weather.main.temp))}{getTempUnit()}
          </p>
          <p className="text-lg mb-1">💧 Humidity: {weather.main.humidity}%</p>
          <p className="text-lg mb-1">💨 Wind: {weather.wind.speed} m/s</p>
          <p className="text-lg capitalize">🌥️ {weather.weather[0].description}</p>
        </div>
      )}

      {/* 🌦️ 3-Day Forecast */}
      {forecast.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {forecast.map((day, index) => {
            const date = new Date(day.date);
            const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
            return (
              <div
                key={index}
                className="bg-white/20 backdrop-blur-lg p-4 rounded-2xl w-40 text-center shadow-md transition-transform hover:scale-105"
              >
                <p className="font-semibold text-lg mb-1">{dayName}</p>
                <div className="flex justify-center mb-1">
                  <ReactAnimatedWeather
                    icon={getWeatherIcon(day.condition)}
                    color="#fff"
                    size={50}
                    animate={true}
                  />
                </div>
                <p className="text-md mb-1">
                  {Math.round(convertTemp(day.temp))}{getTempUnit()}
                </p>
                <p className="text-sm capitalize">{day.description}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
