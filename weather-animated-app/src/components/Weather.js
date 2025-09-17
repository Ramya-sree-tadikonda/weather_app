import React from "react";
import WeatherAnimation from "./WeatherAnimation";

function Weather({ data }) {
    const { location, current } = data;

    const weatherCondition = current.condition.text.toLowerCase();
    const temperature = current.temp_c;
    const humidity = current.humidity;
    const windSpeed = current.wind_kph;

    return (
        <div className="weather-container">
            <h2>{location.name}, {location.country}</h2>
            <div className="weather-info">
                <WeatherAnimation weatherCondition={weatherCondition} />
                <p><strong>Condition:</strong> {weatherCondition}</p>
                <p><strong>Temperature:</strong> {temperature}°C</p>
                <p><strong>Humidity:</strong> {humidity}%</p>
                <p><strong>Wind Speed:</strong> {windSpeed} km/h</p>
            </div>
        </div>
    );
}

export default Weather;
