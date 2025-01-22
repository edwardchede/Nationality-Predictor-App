import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState(""); // State for the city input
  const [weather, setWeather] = useState(null); // State for weather data
  const [error, setError] = useState(null); // State for error messages

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; // Access API key from .env
  const API_URL = "https://api.weatherapi.com/v1/current.json";

  const fetchWeather = async () => {
    if (!city.trim()) {
      alert("Please enter a city name.");
      return;
    }

    try {
      const response = await axios.get(API_URL, {
        params: {
          key: API_KEY,
          q: city,
        },
      });
      setWeather(response.data);
      setError(null);
    } catch (err) {
      setWeather(null);
      setError("Unable to fetch weather. Please check the city name or try again.");
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-details">
          <h2>Weather in {weather.location.name}</h2>
          <p>Temperature: {weather.current.temp_c}°C</p>
          <p>Condition: {weather.current.condition.text}</p>
          <img src={weather.current.condition.icon} alt="Weather icon" />
          <p>Humidity: {weather.current.humidity}%</p>
          <p>Wind Speed: {weather.current.wind_kph} kph</p>
        </div>
      )}
    </div>
  );
}

export default App;
