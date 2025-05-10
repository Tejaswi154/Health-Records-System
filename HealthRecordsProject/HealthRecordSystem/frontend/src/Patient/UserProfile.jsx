import React, { useEffect, useState } from 'react';
import './UserProfile.css';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [donatedPets, setDonatedPets] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Invalid user data in localStorage');
        window.location.href = '/login';
      }
    } else {
      window.location.href = '/login';
    }

    // Get donated pets and count how many are adopted
    const pets = JSON.parse(localStorage.getItem('donatedPets')) || [];
    setDonatedPets(pets);
  }, []);

  if (!user) return <div className="loading-state">Loading...</div>;

  const userInfo = user?.data ?? user;
  const donatedCount = donatedPets.length;
  const adoptedCount = donatedPets.filter(pet => pet.donationStatus === 'Adopted').length;

  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>

      <div className="profile-header">
        {userInfo.profilePhoto ? (
          <img
            className="profile-image-large"
            src={`http://localhost:8091/upload/${userInfo.profilePhoto}`}
            alt="Profile"
          />
        ) : (
          <div className="profile-photo-placeholder">No Image</div>
        )}
        <h3 className="username-display">@{userInfo.username}</h3>
      </div>

      <div className="user-details">
        <div><strong>📧 Email:</strong> {userInfo.email ?? 'N/A'}</div>
        <div><strong>🔐 Role:</strong> {userInfo.role ?? 'N/A'}</div>
        <div><strong>⚠️ Status:</strong> {userInfo.status ?? 'N/A'}</div>
        <div><strong>📍 Zone:</strong> {userInfo.zone ?? 'Not specified'}</div>
      </div>

   
    </div>
  );
}

export default UserProfile;
