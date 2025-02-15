// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import VerifyToken from './components/VerifyToken';
import Signup from './components/Signup';

const App = () => {
  return (
    <Router>
      <Navbar />
      <VerifyToken/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
    </Router>
  );
};

export default App;
