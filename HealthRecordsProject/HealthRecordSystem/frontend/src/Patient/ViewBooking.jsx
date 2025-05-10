import React, { useEffect, useState } from 'react';
import './ViewBooking.css'; // Assuming you are importing the CSS file

const ViewHealthRecords = () => {
  const [healthRecords, setHealthRecords] = useState([]);

  useEffect(() => {
    // Fetch health records from localStorage
    const storedHealthRecords = JSON.parse(localStorage.getItem('healthRecords')) || [];
    setHealthRecords(storedHealthRecords);
  }, []);

  const handleDelete = (index) => {
    // Remove the selected health record
    const updatedHealthRecords = healthRecords.filter((_, i) => i !== index);

    // Update localStorage and state
    localStorage.setItem('healthRecords', JSON.stringify(updatedHealthRecords));
    setHealthRecords(updatedHealthRecords);

    alert('Health record deleted successfully!');
  };

  return (
    <div className="view-health-records-container">
      <h2 className="health-records-title">View Health Records</h2>
      {healthRecords.length === 0 ? (
        <p className="no-records">No health records available.</p>
      ) : (
        <table className="health-records-table">
          <thead>
            <tr className="table-header">
              <th>Patient Name</th>
              <th>Doctor</th>
              <th>Date of Visit</th>
              <th>Diagnosis</th>
              <th>Prescription</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {healthRecords.map((record, index) => (
              <tr key={index}>
                <td>{record.patientName}</td>
                <td>{record.doctor}</td>
                <td>{record.dateOfVisit}</td>
                <td>{record.diagnosis}</td>
                <td>{record.prescription}</td>
                <td>
                  <button
                    onClick={() => handleDelete(index)}
                    style={{
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      marginRight: '5px',
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewHealthRecords;
