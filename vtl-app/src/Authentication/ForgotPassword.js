import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handlePasswordReset = async () => {
    try {
      if (!username || !password || !confirmPassword) {
        setMessage('Please fill in all fields.');
        return;
      }
  
      if (password !== confirmPassword) {
        setMessage('Passwords do not match.');
        return;
      }
  
      try {
        const response = await axios.post('http://localhost:8082/api/user/update-password', { username, password });
  
        if (response.data.error) {
          setMessage(response.data.error);
          return;
        }
  
        setMessage('Password updated successfully.');
        navigate('/');
      } catch (error) {
        console.error('Error updating password:', error);
        setMessage('An error occurred while updating the password.');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      setMessage('An unexpected error occurred.');
    }
  };

  return (
    <div className="login-container">
      <h1>Forgot Password</h1>
      <div className="form-group">
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="form-group">
        <label>New Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Confirm Password:</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </div>
      <div className="links-container">
        <Link to = "/" className="custom-link">
          Return To Login Page
        </Link>
      </div>
      <div className="Login-button">
       <button className="btn-primary" onClick={handlePasswordReset}>Reset Password</button>
       {message && <p>{message}</p>}
      </div> 
    </div>
  );
};

export default ForgotPassword;
