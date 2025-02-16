// src/components/Signup.jsx
import React, { useContext, useState } from 'react';
import axios from 'axios';
import './styles/Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const {URL}=useContext(AuthContext);
  console.log(URL);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(URL+'/api/auth/signup', {
        name,
        email,
        password
      });
      console.log('Signup Successful:', response.data);
      alert('Signup Successful! You can now log in.');
      navigate('/login'); // Redirect to the Login page after successful signup
    } catch (err) {
      console.error('Signup Error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2 className="signup-title">Signup</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="signup-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="signup-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="signup-input"
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="signup-button">Signup</button>
        <p className="login-link-text">
          Already have an account? <Link to="/login" className="login-link">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
