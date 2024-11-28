import React from "react";
import "./Details.css";

function Details({ humidity, wind }) {
  return (
    <div className="details">
      <p>Humidity: <span>{humidity}</span></p>
      <p>Wind: <span>{wind}</span></p>
    </div>
  );
}

export default Details;
