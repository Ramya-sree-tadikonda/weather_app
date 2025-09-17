import React, { useState, useEffect } from "react";
import Weather from "./components/Weather";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [bgImage, setBgImage] = useState("");
  const [audio, setAudio] = useState(null);

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    if (weatherData) {
      const condition = weatherData.current.condition.text.toLowerCase();

      let image = "";
      let sound = "";

      if (condition.includes("rain")) {
        image = "rain-bg.jpg";
        sound = "/sounds/rain.mp3";
      } else if (condition.includes("sunny") || condition.includes("clear")) {
        image = "sunny-bg.jpg";
        sound = "/sounds/sunny.mp3";
      } else if (condition.includes("cloud")) {
        image = "cloudy-bg.jpg";
        sound = "/sounds/cloudy.mp3";
      } else {
        image = "";
        stopSound();
      }

      setBgImage(image);
      if (sound) playSound(sound);
    }
  }, [weatherData]);

  const playSound = (soundUrl) => {
    stopSound();
    const newAudio = new Audio(soundUrl);
    newAudio.loop = true;
    newAudio.play();
    setAudio(newAudio);
  };

  const stopSound = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (city.trim() === "") return;

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        setError(data.error.message);
        setWeatherData(null);
      } else {
        setWeatherData(data);
        setError(null);
      }
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError("Error fetching weather data. Please try again.");
    }
  };

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(/images/${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      <h1>Weather App</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          required
        />
        <button type="submit">Get Weather</button>
      </form>

      {error && <p className="error">{error}</p>}

      {weatherData && <Weather data={weatherData} />}
    </div>
  );
}

export default App;
