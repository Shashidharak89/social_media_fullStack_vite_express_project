import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/UserList.css';
import AuthContext from '../contexts/AuthContext';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(10);
  const navigate = useNavigate();

  const {URL}=useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(URL+'/api/auth/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleViewMore = () => {
    setVisible(prevVisible => prevVisible + 10);
  };

  const handleMessageClick = () => {
    navigate('/home');
  };

  return (
    <div className="user-list-container">
      <h2 className="user-list-title">User Names</h2>
      <ul className="user-list">


        {users.slice(0, visible).map((user, index) => (
          <li key={index} className="user-item">
            <span>{user.name}</span>
            <button 
              className="message-button" 
              onClick={handleMessageClick}
            >
              Message
            </button>
          </li>
        ))}

        
      </ul>
      {visible < users.length && (
        <button className="view-more-button" onClick={handleViewMore}>
          View More
        </button>
      )}
    </div>
  );
};

export default UserList;
