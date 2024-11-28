import React from "react";
import "./WeeklyForecast.css";

function WeeklyForecast({ forecast }) {
  return (
    <div className="weekly-forecast">
      {forecast.map((day, index) => (
        <div className="forecast-day" key={index}>
          <p className="forecast-day-name">{day.day}</p>
          <p className="forecast-icon">{day.icon}</p>
          <p className="forecast-temp">{day.temp}°C</p>
        </div>
      ))}
    </div>
  );
}

export default WeeklyForecast;
