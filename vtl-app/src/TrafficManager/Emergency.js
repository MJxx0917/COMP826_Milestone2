import React, { useState } from 'react';
import axios from 'axios';

const Emergency = () => {
  const [location, setLocation] = useState('');

  const handleSubmit = async () => {
    try {
      if (!location) {
        console.error('Emergency location is required.');
        return;
      }

      await axios.post('http://localhost:8082/api/emergencyLocation', {
        emergency_location: location,
      });

      console.log('Data saved successfully');

      localStorage.setItem('emergencyLocation',location);

      setLocation('');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div className="emergency-container">
      <div className="emergency-form-container">
        <h1>Emergency Handle</h1>
        <input
          type="text"
          placeholder="Enter emergency location"
          className="emergency-input"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button className="emergency-button" onClick={handleSubmit}>Send</button>
      </div>
      
    </div>
  );
};

export default Emergency;
