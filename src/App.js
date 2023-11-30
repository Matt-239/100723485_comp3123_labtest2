import React, { useState } from 'react';
import Search from './components/Search';
import Today from './components/Today';
import Forecast from './components/Forecast';
import './styles.css'

const App = () => {
  const defaultLocation = { latitude: 43.7001, longitude: -79.4163 };
  const [location, setLocation] = useState(defaultLocation);

  const handleSearch = (newLocation) => {
    setLocation(newLocation);
  };

  return (
    <div className="container">
      {location && (
        <div className="weather-section">
          <h1>Weather App</h1>
          <Search onSearch={handleSearch} />
          <Today location={location} />
          <Forecast location={location} />
        </div>
      )}
    </div>
  );
};

export default App;