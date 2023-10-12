import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VirtualTrafficLights() {
  const [lightColor, setLightColor] = useState(null);

  useEffect(() => {
    const generateAndDisplayTrafficLight = async () => {
      try {
        const newID = await generateNewID();

        await axios.post('http://localhost:8082/api/trafficLightID', { trafficLightID: newID });

        const idResponse = await axios.get('http://localhost:8082/api/trafficLightID');
        const latestID = idResponse.data.latestID;

        const initialColor = parseInt(latestID) % 2 === 0 ? 'green' : 'red';

        const response = await axios.get('http://localhost:8082/api/trafficLightSettings');
        console.log('Server response:', response.data);

        const { intervalTime } = response.data;

        setLightColor(initialColor);

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
        }, intervalTime);

        return () => clearInterval(trafficLightInterval);
      } catch (error) {
        console.error('Error creating traffic light:', error);
      }
    };

    const generateNewID = async () => {
      try {
        const idResponse = await axios.get('http://localhost:8082/api/trafficLightID');
        const latestID = idResponse.data.latestID;

        return latestID + 1;
      } catch (error) {
        console.error('Error fetching latest traffic light ID:', error);
        return 1;
      }
    };

    generateAndDisplayTrafficLight();
  }, []);

  useEffect(() => {
    if (lightColor !== null) {
      console.log('Light color updated:', lightColor);
    }
  }, [lightColor]);

  if (lightColor === null) {
    return null;
  }

  return (
    <div className="virtual-traffic-lights">
      <div className={`traffic-light ${lightColor}`}></div>
    </div>
  );
}

export default VirtualTrafficLights;
