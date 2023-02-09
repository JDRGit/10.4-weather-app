import React, { useState, useEffect } from "react";

const Weather = () => {
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState("");

  const fetchWeatherData = async (lat, lon) => {
    const API_KEY = "1a20232643563d73c8a804ad7de5825f";
    const API_URL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`;

    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeatherData(position.coords.latitude, position.coords.longitude);
      },
      (error) => setError(error.message)
    );
  }, []);

  return (
    <div>
      {error && <div>{error}</div>}
      {weatherData.name && (
        <div>
          <h2>Weather in {weatherData.name}:</h2>
          <p>Temperature: {weatherData.main.temp}°F</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Conditions: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;