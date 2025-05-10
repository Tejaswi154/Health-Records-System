import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookAppointment.css';

const BookAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    setAppointments(storedAppointments);
  }, []);

  const handleBook = (appointment) => {
    // Redirect to the Payment page with the selected appointment details
    navigate('/payment', { state: { appointment } });
  };

  return (
    <div className="book-appointment-container">
      <h2>Book an Appointment</h2>
      {appointments.length === 0 ? (
        <p>No appointments available. Please check back later.</p>
      ) : (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Hospital</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time Slot</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index}>
                <td>{appointment.hospital}</td>
                <td>{appointment.doctor}</td>
                <td>{appointment.date}</td>
                <td>{appointment.timeSlot}</td>
                <td>{appointment.description}</td>
                <td>
                  <button
                    onClick={() => handleBook(appointment)}
                    className="book-button"
                  >
                    Book
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

export default BookAppointment;
