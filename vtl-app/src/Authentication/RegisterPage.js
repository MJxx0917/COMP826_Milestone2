import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });

  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessages({ ...errorMessages, [name]: '' }); 
  };

  const handleRadioChange = (e) => {
    setFormData({ ...formData, role: e.target.value });
  };

  const validateForm = () => {
    const errors = {};

    const usernameRegex = /^[a-zA-Z0-9]{5,10}$/;
    if (!usernameRegex.test(formData.username)) {
      errors.username = 'Username must be 5-10 characters and contain letters and numbers.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = 'Invalid email format.';
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{10,15}$/;
    if (!passwordRegex.test(formData.password)) {
      errors.password = 'Password must be 10-15 characters and contain letters and numbers.';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    setErrorMessages(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:8082/api/user', formData);
      console.log('Server response:', response.data);

      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user',
      });

      navigate('/');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errorMessages.username && (
            <p className="error-message">{errorMessages.username}</p>
          )}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errorMessages.email && <p className="error-message">{errorMessages.email}</p>}
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errorMessages.password && <p className="error-message">{errorMessages.password}</p>}
        </div>

        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errorMessages.confirmPassword && (
            <p className="error-message">{errorMessages.confirmPassword}</p>
          )}
        </div>

        <div className="form-group">
          <label>
            Register as:
            <label>
              User
              <input
                type="radio"
                name="role"
                value="user"
                checked={formData.role === 'user'}
                onChange={handleRadioChange}
              />
            </label>
            <label>
              Traffic Manager
              <input
                type="radio"
                name="role"
                value="trafficManager"
                checked={formData.role === 'trafficManager'}
                onChange={handleRadioChange}
              />
            </label>
          </label>
        </div>
        <div className="links-container">
          <Link to="/" className="custom-link">
            Return To Login Page
          </Link>
        </div>
        <div className="Login-button">
         <button type="submit" className="btn-primary">
           Create Account
         </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
