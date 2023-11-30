import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Forecast = ({ location }) => {
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const forecast = data.daily;
        setForecastData(forecast);
      })
      .catch((error) => console.error('Error fetching forecast data', error));
  }, [location]);

  if (!forecastData) {
    return <div>Loading...</div>;
  }

  // Extract relevant forecast details
  const dates = forecastData.time;
  const weatherCodes = forecastData.weather_code;
  const maxTemps = forecastData.temperature_2m_max;
  const minTemps = forecastData.temperature_2m_min;

  const getWeatherIcon = (code) => {
  // Map weather codes to corresponding Font Awesome icons
  switch (code) {
    case 0:
      return <FontAwesomeIcon icon="sun" />;
    case 1:
    case 2:
    case 3:
      return <FontAwesomeIcon icon="cloud-sun" />;
    case 45:
    case 48:
      return <FontAwesomeIcon icon="smog" />;
    case 51:
    case 53:
    case 55:
      return <FontAwesomeIcon icon="cloud-showers-heavy" />;
    case 56:
    case 57:
      return <FontAwesomeIcon icon="icicles" />;
    case 61:
    case 63:
    case 65:
      return <FontAwesomeIcon icon="cloud-rain" />;
    case 66:
    case 67:
      return <FontAwesomeIcon icon="icicles" />;
    case 71:
    case 73:
    case 75:
      return <FontAwesomeIcon icon="snowflake" />;
    case 77:
      return <FontAwesomeIcon icon="snowflakes" />; 
    case 80:
    case 81:
    case 82:
      return <FontAwesomeIcon icon="cloud-showers-heavy" />;
    case 85:
    case 86:
      return <FontAwesomeIcon icon="snowflake" />;
    case 95:
      return <FontAwesomeIcon icon="bolt" />;
    case 96:
    case 99:
      return <FontAwesomeIcon icon="bolt" />;
    default:
      return <FontAwesomeIcon icon="question" />;
    }
  };

  return (
    <div class="forecast-section">
      <h2>6-Day Forecast</h2>
        <div className="forecast-row">
        {/* Render each day horizontally using Flexbox */}
        {dates.slice(0, 6).map((date, index) => (
          <div key={index} className="forecast-item">
            <p>Date: {date}</p>
            <span className='center-content'>
              <p>{getWeatherIcon(weatherCodes[index])}</p>
            </span>
            <p>High: {maxTemps[index]} °C</p>
            <p>Low: {minTemps[index]} °C</p>
          </div>
        ))}
        </div>
    </div>
  );
};

export default Forecast;
