import React, { useState, useEffect } from "react";

const Weather = () => {
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState("");

  const fetchWeatherData = async (latitude, longitude) => {
    const API_KEY = "1a20232643563d73c8a804ad7de5825f";
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`;

    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    let hours = date.getHours();
    const minutes = `0${date.getMinutes()}`;
    let formattedTime;

    if (hours > 12) {
      hours -= 12;
      formattedTime = `${hours}:${minutes.substr(-2)} PM`;
    } else if (hours === 12) {
      formattedTime = `12:${minutes.substr(-2)} PM`;
    } else if (hours === 0) {
      hours = 12;
      formattedTime = `${hours}:${minutes.substr(-2)} AM`;
    } else {
      formattedTime = `${hours}:${minutes.substr(-2)} AM`;
    }
    return formattedTime;
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="weather-container">
      {error && <div className="error">{error}</div>}
      {weatherData.name && (
        <div className="weather-card">
          <h2 className="weather-card-title">
            Currently in {weatherData.name}:
          </h2>
          <p className="weather-card-text">
            Temperature: {weatherData.main.temp.toFixed()}°F
          </p>
          <p className="weather-card-text">
            Humidity: {weatherData.main.humidity}%
          </p>
          <p className="weather-card-text">
            Conditions: {weatherData.weather[0].description}
          </p>
          <p className="weather-card-text">
            Sunrise: {formatTime(weatherData.sys.sunrise)}
          </p>
          <p className="weather-card-text">
            Sunset: {formatTime(weatherData.sys.sunset)}
          </p>
        </div>
      )}
    </div>
  );
};

export default Weather;
