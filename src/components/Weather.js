import React, { useState, useEffect } from "react";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState("");

  const fetchWeatherData = async (latitude, longitude) => {
    const API_KEY = "1a20232643563d73c8a804ad7de5825f";
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`;

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Unable to fetch weather data");
      }
      const data = await response.json();
      setWeatherData(data);
      
      // Set dynamic background based on weather
      const weatherCondition = data.weather[0].main.toLowerCase();
      setBackgroundImage(`https://picsum.photos/1920/1080?${weatherCondition}`);
      
      setLoading(false);
    } catch (error) {
      setError("Error fetching weather data");
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

  const getWeatherIcon = (weatherMain, weatherId) => {
    const iconMap = {
      'clear': '☀️',
      'clouds': '☁️',
      'rain': '🌧️',
      'drizzle': '🌦️',
      'thunderstorm': '⛈️',
      'snow': '❄️',
      'mist': '🌫️',
      'fog': '🌫️',
      'haze': '🌫️'
    };
    return iconMap[weatherMain.toLowerCase()] || '🌤️';
  };

  const getTemperatureColor = (temp) => {
    if (temp >= 80) return '#ff6b6b';
    if (temp >= 70) return '#ffa726';
    if (temp >= 60) return '#66bb6a';
    if (temp >= 50) return '#42a5f5';
    return '#7986cb';
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
        },
        (error) => {
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
    <div className="weather-container" style={{backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none'}}>
      {loading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading weather data...</p>
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
      {weatherData && weatherData.main && (
        <div className="weather-card-enhanced">
          <div className="weather-header">
            <div className="weather-icon">
              {getWeatherIcon(weatherData.weather[0].main)}
            </div>
            <div className="location-info">
              <h2 className="location-name">{weatherData.name}</h2>
              <p className="country">{weatherData.sys.country}</p>
            </div>
          </div>
          
          <div className="temperature-display">
            <span 
              className="main-temperature" 
              style={{color: getTemperatureColor(weatherData.main.temp)}}
            >
              {Math.round(weatherData.main.temp)}°F
            </span>
            <div className="feels-like">
              Feels like {Math.round(weatherData.main.feels_like)}°F
            </div>
          </div>

          <div className="weather-description">
            {weatherData.weather[0].description.charAt(0).toUpperCase() + 
             weatherData.weather[0].description.slice(1)}
          </div>

          <div className="weather-details-grid">
            <div className="weather-detail">
              <span className="detail-label">💧 Humidity</span>
              <span className="detail-value">{weatherData.main.humidity}%</span>
            </div>
            <div className="weather-detail">
              <span className="detail-label">👁️ Visibility</span>
              <span className="detail-value">{weatherData.visibility ? (weatherData.visibility / 1000).toFixed(1) + ' km' : 'N/A'}</span>
            </div>
            <div className="weather-detail">
              <span className="detail-label">🌬️ Wind Speed</span>
              <span className="detail-value">{weatherData.wind?.speed || 0} mph</span>
            </div>
            <div className="weather-detail">
              <span className="detail-label">📊 Pressure</span>
              <span className="detail-value">{weatherData.main.pressure} hPa</span>
            </div>
          </div>

          <div className="sun-times">
            <div className="sun-time">
              <span className="sun-icon">🌅</span>
              <div>
                <div className="sun-label">Sunrise</div>
                <div className="sun-value">{formatTime(weatherData.sys.sunrise)}</div>
              </div>
            </div>
            <div className="sun-time">
              <span className="sun-icon">🌇</span>
              <div>
                <div className="sun-label">Sunset</div>
                <div className="sun-value">{formatTime(weatherData.sys.sunset)}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
