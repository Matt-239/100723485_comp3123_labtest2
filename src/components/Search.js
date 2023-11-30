import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    
    const API_KEY = '9a5ebca9e4e54901899879ba767b4317';
    const geocodingApiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${API_KEY}`;

    fetch(geocodingApiUrl)
      .then((response) => response.json())
      .then((data) => {
        const { lat, lng } = data.results[0].geometry;
        onSearch({ latitude: lat, longitude: lng });
      })
      .catch((error) => console.error('Error fetching geocoding data', error));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;