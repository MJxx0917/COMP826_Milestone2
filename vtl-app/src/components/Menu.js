import React, { useState } from 'react';
import Settings from './Settings'; 
import RouteSet from './RouteSet';
import Notification from './Notification';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showRouteSet, setShowRouteSet] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleOpenSettings = () => {
    setShowSettings(true);
    setShowMenu(false); 
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
    setShowMenu(true); 
  };

  const handleOpenRouteSet = () => {
    setShowRouteSet(true);
    setShowMenu(false);
  }

  const handleCloseRouteSet = () => {
    setShowRouteSet(false);
    setShowMenu(true);
  }

  const handleOpenNotification = () => {
    setShowNotification(true);
    setShowMenu(false);
  }

  const handleCloseNotification = () => {
    setShowNotification(false);
    setShowMenu(true);
  }

  return (
    <div className="menu">
      {showMenu && (
        <div>
          <div className='notification-button'>
            <button onClick={handleOpenNotification}>Notification</button>
          </div>
          <div className='route-button'>
            <button onClick={handleOpenRouteSet}>Route</button>
          </div>
          <div className="profile-button">
            <button>Profile</button>
          </div>
          <div className="settings-button">
            <button onClick={handleOpenSettings}>Set Preferences</button>
          </div>
          <div className="logout-button">
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      )}

      {showSettings && (
        <div className="settings-popup">
          <Settings onClose={handleCloseSettings} />
        </div>
      )}
      {showRouteSet && (
        <div className="route-set-popup">
          <RouteSet onClose={handleCloseRouteSet} />
        </div>
      )}
      {showNotification && (
        <div className="notification-popup">
          <Notification onClose={handleCloseNotification}/>
        </div>
      )}
    </div>
  );
};

export default Menu;
