import React, { useEffect, useState } from 'react';
import Dashboard from '../components/Dashboard';
import Emergency from './Emergency';
import { useNavigate } from 'react-router-dom';

const TrafficManagerPage = () => {
  const [isEmergencyPopupOpen, setIsEmergencyPopupOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem('token');

    if (!isAuthenticated) {
      navigate('/');
    }
  }, [navigate]);

  const openEmergencyPopup = () => {
    setIsEmergencyPopupOpen(true);
  };

  const closeEmergencyPopup = () => {
    setIsEmergencyPopupOpen(false);
  };

  return (
    <div>
      <Dashboard />
      <button className="e-button" onClick={openEmergencyPopup}></button>

      {isEmergencyPopupOpen && (
        <div className="emergency-popup">
          <div className="emergency-popup-content">
            <button className="close-popup" onClick={closeEmergencyPopup}>
              Close
            </button>
            <Emergency />
          </div>
        </div>
      )}
    </div>
  );
};

export default TrafficManagerPage;
