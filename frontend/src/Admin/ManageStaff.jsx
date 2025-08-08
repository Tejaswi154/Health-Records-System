import React, { useState, useEffect } from 'react';
import './ManageStaff.css';
const StaffManagement = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [newStaff, setNewStaff] = useState({
    name: "",
    role: "",
    department: "",
    workToday: false,
    date: "", 
  });
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Load staff members from localStorage when the component mounts
  useEffect(() => {
    const storedStaff = localStorage.getItem("staffMembers");
    if (storedStaff) {
      setStaffMembers(JSON.parse(storedStaff));
    }
  }, []);

  // Save staff members to localStorage whenever they change
  useEffect(() => {
    if (staffMembers.length > 0) {
      localStorage.setItem("staffMembers", JSON.stringify(staffMembers));
    }
  }, [staffMembers]);

  const toggleWorkStatus = (id) => {
    setStaffMembers((prevState) =>
      prevState.map((staff) =>
        staff.id === id ? { ...staff, workToday: !staff.workToday } : staff
      )
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const today = new Date();
    const formattedDate = today.toLocaleDateString();

    const newStaffMember = {
      ...newStaff,
      id: staffMembers.length + 1,
      date: formattedDate,
    };

    const updatedStaffMembers = [...staffMembers, newStaffMember];
    setStaffMembers(updatedStaffMembers);
    setNewStaff({
      name: "",
      role: "",
      department: "",
      workToday: false,
      date: "",
    });
    setShowForm(false); 
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update the search query
  };

  // Filter staff members based on the search query
  const filteredStaffMembers = staffMembers.filter((staff) =>
    staff.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Staff Management</h2>

      {/* Search bar to filter staff members by name */}
      <input
        type="text"
        placeholder="Search by Name"
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-bar"
      />

      {/* Button to show the Add Staff Form */}
      <button onClick={() => setShowForm(true)} className="add-staff-btn">
        Add New Staff
      </button>

      {/* Form to Add New Staff */}
      {showForm && (
        <form onSubmit={handleSubmit} className="add-staff-form">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={newStaff.name}
            onChange={handleInputChange}
            required
          />
          <label>Role:</label>
          <input
            type="text"
            name="role"
            value={newStaff.role}
            onChange={handleInputChange}
            required
          />
          <label>Department:</label>
          <input
            type="text"
            name="department"
            value={newStaff.department}
            onChange={handleInputChange}
            required
          />
          <label>Work Today:</label>
          <input
            type="checkbox"
            name="workToday"
            checked={newStaff.workToday}
            onChange={(e) => setNewStaff((prevState) => ({ ...prevState, workToday: e.target.checked }))}
          />
          <button type="submit">Add Staff</button>
        </form>
      )}

      {/* Staff List */}
      <div className="staff-list">
        {filteredStaffMembers.length > 0 ? (
          filteredStaffMembers.map((staff) => (
            <div key={staff.id} className="staff-card">
              <div className="staff-details">
                <h3>{staff.name}</h3>
                <p><strong>Role:</strong> {staff.role}</p>
                <p><strong>Department:</strong> {staff.department}</p>
                <p><strong>Work Today:</strong> {staff.workToday ? "Yes" : "No"}</p>
                <p><strong>Date:</strong> {staff.date}</p>
                {/* Toggle button to update work status */}
                <button
                  className={`status-btn ${staff.workToday ? 'active' : 'inactive'}`}
                  onClick={() => toggleWorkStatus(staff.id)}
                >
                  {staff.workToday ? "Mark as Inactive" : "Mark as Active"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No staff members found.</p>
        )}
      </div>
    </div>
  );
};

export default StaffManagement;
// This code is a React component for managing staff members in a hospital management system. It allows the admin to add new staff members, toggle their work status, and search for staff members by name. The staff data is stored in localStorage to persist across page reloads.