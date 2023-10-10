import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8082/api/user/login', {
        username,
        password,
      });

      const { token, role } = response.data.user;

      localStorage.setItem('token', token);

      if (role === 'user') {
        navigate('/dashboard');
      } else if (role === 'trafficManager') {
        navigate('/traffic-manager-page');
      }
    } catch (error) {
      console.error('Login failed:', error);

      if (error.response && error.response.status === 401) {
        setErrorMessage('Wrong password');
      } else if (error.response && error.response.status === 404) {
        setErrorMessage('Username does not exist');
      } else {
        setErrorMessage('An error occurred during login');
      }
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <div className="form-group">
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="links-container">
        <Link to="/register-page" className="custom-link">
          Create Account
        </Link>
        <Link to="/forgot-password" className="custom-link">
          Forgot password
        </Link>
      </div>
      <div className="Login-button">
        <button className="btn-primary" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
