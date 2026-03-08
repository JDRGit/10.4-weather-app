import React, { useState, useEffect } from "react";

const WeatherCardText = ({ label, value }) => (
  <p className="weather-card-text">
    <strong>{label}:</strong> {value}
  </p>
);

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchWeatherData = async (latitude, longitude) => {
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`;

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Unable to fetch weather data");
      }
      const data = await response.json();
      setWeatherData(data);
      setLoading(false);
    } catch (error) {
      setError(error.message || "Error fetching weather data");
      setLoading(false);
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
        () => {
          setError("Geolocation permission denied");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  return (
    <div className="weather-container" role="main">
      {loading && <div>Loading weather data...</div>}
      {error && <div className="error" role="alert">{error}</div>}
      {weatherData && weatherData.main && (
        <div className="weather-card">
          <h2 className="weather-card-title">
            Currently in {weatherData.name}:
          </h2>
          <WeatherCardText label="Temperature" value={`${weatherData.main.temp.toFixed()}°F`} />
          <WeatherCardText label="Humidity" value={`${weatherData.main.humidity}%`} />
          <WeatherCardText label="Conditions" value={weatherData.weather[0].description} />
          <WeatherCardText label="Sunrise" value={formatTime(weatherData.sys.sunrise)} />
          <WeatherCardText label="Sunset" value={formatTime(weatherData.sys.sunset)} />
        </div>
      )}
    </div>
  );
};

export default Weather;
