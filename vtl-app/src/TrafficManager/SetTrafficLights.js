import React, { useState } from 'react';
import axios from 'axios';

function SetTrafficLights() {
  const [intervalTime, setIntervalTime] = useState(5000); 
  const [initialColor, setInitialColor] = useState('red'); 

  const handleSaveSettings = async () => {
    try {
      await axios.post('http://localhost:8082/api/trafficLightSettings', { intervalTime, initialColor });
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings. Please try again.');
    }
  };

  return (
    <div className="set-traffic-lights">
      <div>
        <label>Interval Time (in milliseconds):</label>
        <input
          type="number"
          value={intervalTime}
          onChange={(e) => setIntervalTime(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Initial Traffic Light Color:</label>
        <select value={initialColor} onChange={(e) => setInitialColor(e.target.value)}>
          <option value="red">Red</option>
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
        </select>
      </div>
      <button onClick={handleSaveSettings}>Save Settings</button>
    </div>
  );
}

export default SetTrafficLights;
