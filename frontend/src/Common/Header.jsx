import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [userRole, setUserRole] = useState(() => {
    // Initialize userRole from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        return user.role; // Return the role if it exists
      } catch (e) {
        console.error('Invalid user data in localStorage');
      }
    }
    return null; // Default to null if no user is found
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUserRole(null);
    navigate('/login');
  };

  const handleNavigateToPostAppointments = () => {
    navigate('/admin/post-appointments'); // Navigate to Post Appointments page
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <Link to="/">Hospital Management</Link>
        </div>
        <ul className="nav-links">
          {/* Show Home and About only if the user is not an admin */}
          {userRole !== 'admin' && (
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
            </>
          )}

          {/* Conditional Links Based on Role */}
          {userRole === 'admin' && (
            <>
              <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>
              <li><Link to="/admin/manage-staff">Manage Staff</Link></li>
              <li><Link to="/admin/allocate-resources">Allocate Resources</Link></li>
         
          
              <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
            </>
          )}
          {userRole === 'doctor' && (
            <>
                   <li><Link to="/admin/view-appointments">View Appointments</Link></li>
                       <li>
                <button
                  onClick={handleNavigateToPostAppointments}
                  className="navigate-button"
                >
                  Post Appointment
                </button>
              </li>
                          <li><Link to="/admin/health-record">Health Record</Link></li> {/* Add link for HealthRecord */}
                            <li><button onClick={handleLogout} className="logout-button">Logout</button></li>

            </>
          )}
          {userRole === 'user' && (
            <>
              <li><Link to="/user-profile">User Profile</Link></li>
              <li><Link to="/book-appointment">Book Appointment</Link></li>
              <li><Link to="/view-booking">View Bookings</Link></li> {/* Added View Bookings link */}
              <li><Link to="/contact">Contact</Link></li>
          
              <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
            </>
          )}

          {/* Default Options for Non-Logged-In Users */}
          {!userRole && (
            <>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/admin/login">Admin Login</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;