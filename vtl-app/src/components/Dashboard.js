import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.js';
import '../App.css';
import { createRoot } from 'react-dom/client';
import VirtualTrafficLights from './VirtualTrafficLights';
import Menu from './Menu';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const [authenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    let map = null;
    let markers = [];
    let routingControl = null;

    const getLocationInfo = async (lat, lng) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );
        const data = await response.json();
        return {
          locationName: data.display_name || 'Unknown Location',
          locationType: data?.address?.road ? 'Street' : 'No traffic light here',
        };
      } catch (error) {
        console.error('Error fetching location info:', error);
        return {
          locationName: 'Unknown Location',
          locationType: 'Unknown',
        };
      }
    };

    const getRealTimeTrafficData = async (startLat, startLng, endLat, endLng) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${startLat}&lon=${startLng}&appid=738775e31fda6a80e39cf3a9a9ccbe46`
        );
    
        if (!response.ok) {
          console.error(`API request failed with status: ${response.status}`);
          console.error('Response:', await response.text());
          throw new Error('API request failed');
        }
    
        const data = await response.json();
    
        const roadCondition = data?.list[0]?.main?.aqi; 
        if (roadCondition === undefined) {
          throw new Error('Road condition data not available');
        }
    
        const trafficLightPriority = determineTrafficLightPriority(roadCondition);
    
        return {
          roadCondition,
          trafficLightPriority,
        };
      } catch (error) {
        console.error('Error fetching real-time traffic data:', error);
        return {
          roadCondition: 'Unknown',
          trafficLightPriority: 'Unknown',
        };
      }
    };
    
    const determineTrafficLightPriority = (roadCondition) => {
      if (roadCondition >= 0 && roadCondition <= 50) {
        return 'Low Priority';
      } else if (roadCondition > 50 && roadCondition <= 100) {
        return 'Medium Priority';
      } else {
        return 'High Priority';
      }
    };

    const updatePopupContent = async () => {
      if (markers.length === 2) {
        const { roadCondition, trafficLightPriority } = await getRealTimeTrafficData(
          markers[0].getLatLng().lat,
          markers[0].getLatLng().lng,
          markers[1].getLatLng().lat,
          markers[1].getLatLng().lng
        );

        const popupContent = document.createElement('div');
        const virtualTrafficLightsContainer = document.createElement('div');

        popupContent.innerHTML = `
          <div class="larger-popup">
            <h3>Traffic Light</h3>
            <p>Road Condition (AQI Index): ${roadCondition}</p>
            <p>Traffic Light Priority: ${trafficLightPriority}</p>
          </div>
        `;

        popupContent.appendChild(virtualTrafficLightsContainer);

        markers[1].setPopupContent(popupContent);
      }
    };

    if (document.getElementById('map') && !map) {
      const initialCoordinates = [-36.8485, 174.7633]; // Auckland, NZ
      const initialZoom = 15;

      map = L.map('map').setView(initialCoordinates, initialZoom);

      L.tileLayer('https://tile.memomaps.de/tilegen/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map.on('dblclick', async (event) => {
        const { lat, lng } = event.latlng;

        const { locationName, locationType } = await getLocationInfo(lat, lng);

        if (locationType === 'Street') {
          const marker = L.marker([lat, lng], { icon: createCustomIcon() }).addTo(map);

          const popupContent = document.createElement('div');
          const virtualTrafficLightsContainer = document.createElement('div');

          const { roadCondition, trafficLightPriority } = await getRealTimeTrafficData(
            markers[0]?.getLatLng()?.lat || lat,
            markers[0]?.getLatLng()?.lng || lng,
            lat,
            lng
          );

          popupContent.innerHTML = `
            <div class="larger-popup">
              <h3>Traffic Light</h3>
              <p>Location: ${locationName}</p>
              <p>Road Condition: ${roadCondition}</p>
              <p>Traffic Light Priority: ${trafficLightPriority}</p>
            </div>
          `;

          popupContent.appendChild(virtualTrafficLightsContainer);

          marker.bindPopup(popupContent).openPopup();

          marker.on('click', () => {
            map.removeLayer(marker);
            markers = markers.filter((m) => m !== marker);
          });

          const root = createRoot(virtualTrafficLightsContainer);
          root.render(<VirtualTrafficLights />);

          markers.push(marker);

          if (markers.length === 2) {
            routingControl = L.Routing.control({
              waypoints: [
                L.latLng(markers[0].getLatLng()),
                L.latLng(markers[1].getLatLng()),
              ],
            }).addTo(map);

            marker.on('click', () => {
              map.removeLayer(marker);
              markers = markers.filter((m) => m !== marker);
              if (routingControl) {
                map.removeControl(routingControl);
                routingControl = null;
              }
            });
          }

          await updatePopupContent();
        } else {
          alert('There is no traffic light here');
        }
      });
    }

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [authenticated]);

  const createCustomIcon = () => {
    const customIcon = L.divIcon({
      className: 'custom-marker-icon',
    });

    return customIcon;
  };

  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => {
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  if (!authenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div id="map" className="map-container"></div>
      <button className="open-menu-button" onClick={openMenu}></button>
      {menuVisible && (
        <div className="menu-popup">
          <div className="menu-popup-content">
            <button className="close-popup" onClick={closeMenu}>
              Close
            </button>
            <Menu />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
