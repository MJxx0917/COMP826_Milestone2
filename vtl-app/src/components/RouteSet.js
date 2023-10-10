import React, { useState } from 'react';
import axios from 'axios';

const RouteSet = () => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');

  const handleDoneClick = async () => {
    try {
      if (!fromLocation || !toLocation) {
        console.error('Starting location and destination are required.');
        return;
      }

      await axios.post('http://localhost:8082/api/trafficLight', {
        starting_location: fromLocation,
        destination: toLocation,
      });

      console.log('Data saved to the database.');

      setFromLocation('');
      setToLocation('');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div className="route-set-container">
      <span className="separator">From:</span>
      <input
        type="text"
        placeholder="From"
        className="search-bar"
        value={fromLocation}
        onChange={(e) => setFromLocation(e.target.value)}
      />

      <span className="separator">To:</span>
      <input
        type="text"
        placeholder="To"
        className="search-bar"
        value={toLocation}
        onChange={(e) => setToLocation(e.target.value)}
      />

      <button className="done" onClick={handleDoneClick}>
        Done
      </button>
    </div>
  );
};

export default RouteSet;
