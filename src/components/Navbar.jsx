// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';
import AuthContext from '../contexts/AuthContext';

const Navbar = () => {
    const {URL}=useContext(AuthContext);
  return (
    <nav className="navbar">
      <div className="navbar-title">XYZGRAM</div>
      <div className="navbar-links">
        <Link to="/login" className="login-link">Login/Signup</Link>
      </div>
    </nav>
  );
};

export default Navbar;
