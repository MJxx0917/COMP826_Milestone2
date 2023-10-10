import React, { useEffect, useState } from 'react';

const Notification = () => {
  const [emergencyLocation, setEmergencyLocation] = useState('');

  useEffect(() => {
    const location = localStorage.getItem('emergencyLocation');

    if (location) {
      setEmergencyLocation(location);
    }

    const intervalId = setInterval(() => {
      const updatedLocation = localStorage.getItem('emergencyLocation');
      if (updatedLocation && updatedLocation !== emergencyLocation) {
        setEmergencyLocation(updatedLocation);
      }
    },); 

    return () => {
      clearInterval(intervalId);
    };
  }, [emergencyLocation]);

  return (
    <div className="notification-container">
      <h1>Notification</h1>
      <div className="notification-message">
        {emergencyLocation ? (
          <p>Emergency Location: {emergencyLocation}</p>
        ) : (
          <p>No emergency location available.</p>
        )}
      </div>
    </div>
  );
};

export default Notification;
