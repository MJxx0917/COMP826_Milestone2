import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import LoginPage from './Authentication/LoginPage';
import RegisterPage from './Authentication/RegisterPage';
import ForgotPassword from './Authentication/ForgotPassword';
import Dashboard from './components/Dashboard';
import VirtualTrafficLights from './components/VirtualTrafficLights';
import Menu from './components/Menu';
import Settings from './components/Settings';
import RouteSet from './components/RouteSet';
import Notification from './components/Notification';
import TrafficManagerPage from './TrafficManager/TrafficManagerPage';
import Emergency from './TrafficManager/Emergency';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<LoginPage />} />
          <Route exact path='/register-page' element={<RegisterPage />} />
          <Route exact path='/forgot-password' element={<ForgotPassword />} />
          <Route exact path='/dashboard' element={<Dashboard />} />
          <Route exact path='/virtual-traffic-lights' element={<VirtualTrafficLights />} />
          <Route exact path='/menu' element={<Menu />} />
          <Route exact path='/settings' element={<Settings />} />
          <Route exact path='/route-set' element={<RouteSet />} />
          <Route exact path='/notification' element={<Notification />} />
          <Route exact path='/traffic-manager-page' element={<TrafficManagerPage />} />
          <Route exact path='/emergency' element={<Emergency />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
//personalized-routes
