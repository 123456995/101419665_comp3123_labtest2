import React from "react";
import "./Details.css";

function Details({ uvIndex, humidity, wind, population }) {
  return (
    <div className="details">
      <p>UV Index: <span>{uvIndex}</span></p>
      <p>Humidity: <span>{humidity}</span></p>
      <p>Wind: <span>{wind}</span></p>
      <p>Population: <span>{population}</span></p>
    </div>
  );
}

export default Details;
