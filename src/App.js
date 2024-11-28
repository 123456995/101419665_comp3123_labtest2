import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("Toronto");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const API_KEY = "2f57df5803b632594b593242a07d9991";
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch weather data: ${response.statusText}`);
        }
        const data = await response.json();
        setWeatherData(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError(error.message);
        setWeatherData(null);
      }
    };

    fetchWeather();
  }, [city]);

  const handleSearch = (newCity) => {
    setCity(newCity);
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <p className="error">{error}</p>}
      {weatherData ? (
        <WeatherDisplay data={weatherData} />
      ) : (
        !error && <p>Loading...</p>
      )}
    </div>
  );
};

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearchClick = () => {
    if (input.trim() !== "") {
      onSearch(input);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Enter city name"
      />
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
};

const WeatherDisplay = ({ data }) => {
  if (!data || !data.main || !data.weather) {
    return <p>Loading or no data available...</p>;
  }

  const { name, main, weather } = data;

  return (
    <div className="weather-display">
      <h2>{name}</h2>
      <p>Temperature: {main.temp}°C</p>
      <p>Condition: {weather[0].description}</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
        alt={weather[0].description}
      />
    </div>
  );
};

export default App;