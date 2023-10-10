import React, { useState } from 'react';
import axios from 'axios';

const Settings = () => {
  const [preferences, setPreferences] = useState({
    foodOptions: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      alcoholFree: false,
      halal: false,
      kosher: false,
    },
    drivingStyle: {
      cautious: false,
      normal: false,
      aggressive: false,
    },
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleFoodOptionsChange = (event) => {
    const { name, checked } = event.target;
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      foodOptions: {
        ...prevPreferences.foodOptions,
        [name]: checked,
      },
    }));
  };

  const handleDrivingStyleChange = (event) => {
    const { name, checked } = event.target;
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      drivingStyle: {
        ...prevPreferences.drivingStyle,
        [name]: checked,
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log('Sending data to the server:', preferences);

      if (!preferences.foodOptions || !preferences.drivingStyle) {
        setErrorMessage('Both foodOptions and drivingStyle are required.');
        return;
      }

      const response = await axios.post('http://localhost:8082/api/preference', {
        foodOptions: preferences.foodOptions,
        drivingStyle: preferences.drivingStyle,
      });

      if (response.status === 201) {
        console.log('Preferences saved successfully');
        setErrorMessage('');
      } else {
        console.error('Unexpected response from the server:', response);
        setErrorMessage('An error occurred while saving preferences');
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.error('Request was canceled:', error.message);
      } else {
        console.error('Error saving preferences:', error);
        setErrorMessage('An error occurred while saving preferences');
      }
    }
  };

  return (
    <div className="setting-container">
      <h2>Set Preferences</h2>
      <form onSubmit={handleSubmit}>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="form-group">
          <label>Dietary Options:</label>
          <div className="checkbox-group">
            {Object.entries(preferences.foodOptions).map(([option, value]) => (
              <label key={option}>
                <input
                  type="checkbox"
                  name={option}
                  checked={value}
                  onChange={handleFoodOptionsChange}
                />
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </label>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label>Driving Style:</label>
          <div className="checkbox-group">
            {Object.entries(preferences.drivingStyle).map(([style, value]) => (
              <label key={style}>
                <input
                  type="checkbox"
                  name={style}
                  checked={value}
                  onChange={handleDrivingStyleChange}
                />
                {style.charAt(0).toUpperCase() + style.slice(1)}
              </label>
            ))}
          </div>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Settings;
