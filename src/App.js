import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("Toronto");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const API_KEY = "b7dfac82f04e079b06aa1c42ec4b1dd7";
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
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
      {weatherData ? (
        <WeatherDisplay data={weatherData} />
      ) : (
        <p>Loading...</p>
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
    onSearch(input);
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
