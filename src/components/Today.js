import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Today = ({ location }) => {
  const [todayData, setTodayData] = useState(null);

  useEffect(() => {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=weather_code,temperature_2m`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const today = data.hourly;
        setTodayData(today);
      })
      .catch((error) => console.error('Error fetching today\'s data', error));
  }, [location]);

  if (!todayData) {
    return <div>Loading...</div>;
  }

  const time = todayData.time[0];
  const currentDate = new Date(time);
  const date = currentDate.toLocaleDateString();

  const currentTemperature = todayData.temperature_2m[0];
  const weatherCode = todayData.weather_code[0];

  const getWeatherIcon = (code) => {
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
    <div className="today-weather">
      <h2>Today's Weather</h2>
      <div className="today-item">
        <div className="left-column">
          <p>Current Date: {date}</p>
          <p>Current Temperature: {currentTemperature} °C</p>
        </div>
        <div className="right-column weather-icon">
          <p>{getWeatherIcon(weatherCode)}</p>
        </div>
      </div>
    </div>
  );
};

export default Today;