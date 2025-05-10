import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { bookingApi } from '../api'; // Correctly import bookingApi

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { appointment } = location.state || {};

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
        // Replace with the logged-in user's ID
        const userId = 1;

        // Ensure appointment data is valid
        if (!appointment || !appointment.date) {
            console.error('Invalid appointment data:', appointment);
            alert('Invalid appointment details. Please try again.');
            return;
        }

        // Prepare booking data
        const bookingData = {
            userId,
            hospital: appointment.hospital,
            doctor: appointment.doctor,
            date: appointment.date || new Date().toISOString().split('T')[0], // Default to today's date
            timeSlot: appointment.timeSlot,
            description: appointment.description || null, // Set to null if not provided
        };

        // Log the booking data for debugging
        console.log('Booking Data:', bookingData);

        // Send booking data to the backend
        const response = await bookingApi.createBooking(bookingData);

        alert('Payment successful! Your appointment has been booked.');

        // Redirect to the ViewBooking page
        navigate('/view-booking');
    } catch (error) {
        console.error('Error booking appointment:', error);
        alert('Failed to book appointment. Please try again.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#007bff' }}>Payment</h2>
      <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <p>
          <strong>Hospital:</strong> {appointment.hospital}
        </p>
        <p>
          <strong>Doctor:</strong> {appointment.doctor}
        </p>
        <p>
          <strong>Date:</strong> {appointment.date}
        </p>
        <p>
          <strong>Time Slot:</strong> {appointment.timeSlot}
        </p>
        <p>
          <strong>Description:</strong> {appointment.description}
        </p>
        <div>
          <label style={{ fontWeight: 'bold' }}>Card Number:</label>
          <input
            type="text"
            name="cardNumber"
            required
            placeholder="Enter your card number"
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '5px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        </div>
        <div>
          <label style={{ fontWeight: 'bold' }}>CVV:</label>
          <input
            type="text"
            name="cvv"
            required
            placeholder="Enter CVV"
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '5px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Pay and Book
        </button>
      </form>
    </div>
  );
};

export default Payment;