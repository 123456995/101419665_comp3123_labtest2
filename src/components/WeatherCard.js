import React from "react";
import "./WeatherCard.css";

function WeatherCard({ day, date, temperature, condition, location }) {
  return (
    <div className="weather-card">
      <h2 className="day">{day}</h2>
      <p className="date">{date}</p>
      <p className="location">{location}</p>
      <h1 className="temperature">{temperature}°C</h1>
      <p className="condition">{condition}</p>
    </div>
  );
}

export default WeatherCard;
