// src/components/Login.jsx
import React, { useContext, useState } from 'react';
import axios from 'axios';
import './styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const {URL}=useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(URL+'/api/auth/login', {
        email,
        password
      });

      // Store the token in local storage
      const token = response.data.token;
      localStorage.setItem('authToken', token);

      console.log('Login Successful:', response.data);
      alert('Login Successful!');
      navigate('/'); // Redirect to Home page on successful login
    } catch (err) {
      console.error('Login Error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-button">Login</button>
        <p className="signup-link-text">
          Don't have an account? <Link to="/signup" className="signup-link">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
