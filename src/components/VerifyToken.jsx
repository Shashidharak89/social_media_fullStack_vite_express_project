// src/components/VerifyToken.jsx
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';

const VerifyToken = () => {
  const [verificationStatus, setVerificationStatus] = useState('');
  const { URL, userId, setUserId,
    username, setUsername,
    mail, setMail } = useContext(AuthContext);
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        setVerificationStatus('No token found. Please login.');
        return;
      }

      try {
        const response = await axios.get(`${URL}/api/auth/verify/${token}`);
        console.log('Verification Response:', response.data);
        setVerificationStatus(response.data.message || 'Token Verified Successfully!');
        setUserId(response.data.userId);
        setUsername(response.data.name);
        setMail(response.data.email);
      } catch (err) {
        console.error('Verification Error:', err.response?.data || err.message);
        setVerificationStatus('Token Verification Failed. Please login again.');
      }
    };

    verifyToken();
  }, []);

  return (
    <div className="verify-container">
      <h2 className="verify-title">Token Verification</h2>
      <p className="verify-status">{verificationStatus}</p>
      <p>{username}</p>
      <p>{userId}</p>
      <p>{mail}</p>
    </div>
  );
};

export default VerifyToken;
