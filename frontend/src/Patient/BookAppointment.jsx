import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookAppointment.css';

const BookAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [appointmentData, setAppointmentData] = useState({
    hospital: '',
    doctor: '',
    date: '',
    timeSlot: '',
    description: '',
    image: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    console.log('Retrieved Appointments:', storedAppointments); // Debugging
    setAppointments(storedAppointments);
  }, []);

  const handleBook = (appointment) => {
    // Redirect to the Payment page with the selected appointment details
    navigate('/payment', { state: { appointment } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAppointment = {
      ...appointmentData,
    };

    const existingAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const updatedAppointments = [...existingAppointments, newAppointment];
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));

    alert('Appointment posted successfully!');
    setAppointmentData({
      hospital: '',
      doctor: '',
      date: '',
      timeSlot: '',
      description: '',
      image: null,
    });
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
              <th>Image</th>
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
                <td>
                  {appointment.image ? (
                    <img
                      src={appointment.image}
                      alt="Appointment"
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                  ) : (
                    'No Image'
                  )}
                </td>
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
