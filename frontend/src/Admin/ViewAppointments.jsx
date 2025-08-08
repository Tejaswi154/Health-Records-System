import React, { useEffect, useState } from 'react';

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments from localStorage
    const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    setAppointments(storedAppointments);
  }, []);

  const handleDelete = (index) => {
    // Remove the selected appointment
    const updatedAppointments = appointments.filter((_, i) => i !== index);

    // Update localStorage and state
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    setAppointments(updatedAppointments);

    alert('Appointment deleted successfully!');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#007bff' }}>View Appointments</h2>
      {appointments.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#555' }}>No appointments available.</p>
      ) : (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#3b82f6', textAlign: 'left' }}>
              <th>Hospital</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Doctor</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Date</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Time Slot</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Description</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{appointment.hospital}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{appointment.doctor}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{appointment.date}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{appointment.timeSlot}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{appointment.description}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
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

export default ViewAppointments;
