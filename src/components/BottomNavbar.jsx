import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiFillHome, AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';
import './styles/BottomNavbar.css';

const BottomNavbar = () => {
  return (
    <div className="bottom-navbar">
      <NavLink to="/" className="nav-item" activeClassName="active">
        <AiFillHome className="icon" />
        <span>Home</span>
      </NavLink>
      <NavLink to="/userslist" className="nav-item" activeClassName="active">
        <AiOutlineSearch className="icon" />
        <span>Search</span>
      </NavLink>
      <NavLink to="/profile" className="nav-item" activeClassName="active">
        <AiOutlineUser className="icon" />
        <span>Profile</span>
      </NavLink>
    </div>
  );
};

export default BottomNavbar;
