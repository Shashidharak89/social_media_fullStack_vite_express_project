import React from 'react';
import './styles/Profile.css';

const Profile = () => {
  const user = {
    userId: '12345',
    name: 'John Doe',
    email: 'johndoe@example.com',
    profileImage: 'https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-business-user-profile-vector-png-image_1541960.jpg' // Dummy image source
  };

  return (
    <div className="profile-card">
      <div className="profile-image">
        <img src={user.profileImage} alt="Profile" />
      </div>
      <div className="profile-details">
        <h2>{user.name}</h2>
        <p><strong>User ID:</strong> {user.userId}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
};

export default Profile;
