import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const admin = JSON.parse(localStorage.getItem('user'));

  const [showAdminDetails, setShowAdminDetails] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8091/api/users/all');
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Could not load user data');
    } finally {
      setLoading(false);
    }
  };

  // Delete a user
  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:8091/api/users/${userId}`);
      if (response.status === 200) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Could not delete user');
    }
  };

  // Fetch users when "Show Users" is toggled
  useEffect(() => {
    if (showUsers && users.length === 0) {
      fetchUsers();
    }
  }, [showUsers]);

  // Restrict access if not an admin
  

  return (
    <div className="admin-dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <p className="dashboard-subtitle">Welcome! Manage users and platform data here.</p>

      {/* Admin Actions */}
      <div className="dashboard-actions">
        <button
          className="action-btn"
          onClick={() => setShowAdminDetails((prev) => !prev)}
        >
          {showAdminDetails ? 'Hide Admin Details' : 'Show Admin Details'}
        </button>
        <button
          className="action-btn"
          onClick={() => setShowUsers((prev) => !prev)}
        >
          {showUsers ? 'Hide User Logins' : 'Show Logged-In Users'}
        </button>
      </div>

      {/* Admin Details */}
      {showAdminDetails && (
        <div className="admin-details-card">
          <h2>Admin Info</h2>
          <p><strong>Name:</strong> {admin?.name || 'N/A'}</p>
          <p><strong>Email:</strong> {admin?.email || 'N/A'}</p>
        </div>
      )}

      {/* User Logins */}
      {showUsers && (
        <div className="user-logins-section">
          <h2>Registered Users</h2>
          {loading && <p>Loading users...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          {users.length > 0 ? (
            users.map((user) => (
              <div key={user.id} className="user-card">
                <div className="user-avatar-container">
                  {user.profilePhoto ? (
                    <img
                      src={`http://localhost:8091/upload/${user.profilePhoto}`}
                      alt={user.username}
                      className="user-avatar"
                    />
                  ) : (
                    <div className="user-avatar-placeholder">No Profile Photo</div>
                  )}
                </div>
                <div className="user-details">
                  <p><strong>Name:</strong> {user.username}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Status:</strong> {user.status}</p>
                  <p><strong>Zone:</strong> {user.zone}</p>
                 
                </div>
                <button
                  className="delete-btn"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete User
                </button>
              </div>
            ))
          ) : (
            !loading && <p>No users found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
