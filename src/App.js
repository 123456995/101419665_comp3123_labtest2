import React, { useState } from "react";
import WeatherCard from "./components/WeatherCard";
import WeeklyForecast from "./components/WeeklyForecast";
import Details from "./components/Details";
import { fetchWeatherData } from "./utils/api";
import "./App.css";

function App() {
  const [city, setCity] = useState("Toronto");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await fetchWeatherData(city);
      setWeather({
        day: new Date().toLocaleDateString("en-US", { weekday: "long" }),
        date: new Date().toLocaleDateString(),
        location: `${data.name} - ${data.sys.country}`,
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].description,
        weeklyForecast: [
          { day: "Mon", temp: Math.round(data.main.temp + 2), icon: "☀️" },
          { day: "Tue", temp: Math.round(data.main.temp - 1), icon: "⛅" },
          { day: "Wed", temp: Math.round(data.main.temp), icon: "☁️" },
          { day: "Thu", temp: Math.round(data.main.temp + 3), icon: "🌧️" },
          { day: "Fri", temp: Math.round(data.main.temp + 1), icon: "☀️" },
        ],
        uvIndex: "N/A",
        humidity: `${data.main.humidity}%`,
        wind: `${data.wind.speed} km/h`,
        population: "N/A",
      });
    } catch (err) {
      setError("Could not fetch weather data. Please try again.");
    }
  };

  return (
    <div className="weather-app">
      <h1 className="title">Weather Forecast</h1>
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {weather && (
        <>
          <WeatherCard
            day={weather.day}
            date={weather.date}
            location={weather.location}
            temperature={weather.temperature}
            condition={weather.condition}
          />
          <WeeklyForecast forecast={weather.weeklyForecast} />
          <Details
            uvIndex={weather.uvIndex}
            humidity={weather.humidity}
            wind={weather.wind}
            population={weather.population}
          />
        </>
      )}
    </div>
  );
}

export default App;