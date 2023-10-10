import React, { useState, useEffect } from 'react';

function VirtualTrafficLights() {
  const [lightColor, setLightColor] = useState('red'); 

  useEffect(() => {
    const trafficLightInterval = setInterval(() => {
      setLightColor((prevColor) => {
        switch (prevColor) {
          case 'red':
            return 'green';
          case 'green':
            return 'yellow';
          case 'yellow':
            return 'red';
          default:
            return 'red'; 
        }
      });
    }, 5000); 

    return () => clearInterval(trafficLightInterval);
  }, []);

  return (
    <div className="virtual-traffic-lights">
      <div className="traffic-light">
        <div className={`red ${lightColor !== 'red' ? 'active' : ''}`}></div>
        <div className={`yellow ${lightColor !== 'yellow' ? 'active' : ''}`}></div>
        <div className={`green ${lightColor !== 'green' ? 'active' : ''}`}></div>
      </div>
    </div>
  );
}

export default VirtualTrafficLights;
