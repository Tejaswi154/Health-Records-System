import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div style={{ width: "200px", backgroundColor: "#eee", height: "100vh", padding: "1rem" }}>
      <h3>Menu</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><Link to="/patient/dashboard">Patient Dashboard</Link></li>
        <li><Link to="/doctor/dashboard">Doctor Dashboard</Link></li>
        <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
