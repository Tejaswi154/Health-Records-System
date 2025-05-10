import React, { useState } from 'react';

const PostAppointments = () => {
  const [appointmentData, setAppointmentData] = useState({
    hospital: '',
    doctor: '',
    date: '',
    timeSlot: '',
    description: '',
    image: null, // Add image field
  });

  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [availableCount, setAvailableCount] = useState(0);

  const timeSlots = [
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '01:00 PM - 02:00 PM',
    '02:00 PM - 03:00 PM',
    '03:00 PM - 04:00 PM',
  ]; // Example time slots

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData({ ...appointmentData, [name]: value });

    if (name === 'doctor' || name === 'date') {
      const { doctor, date } = { ...appointmentData, [name]: value };
      if (doctor && date) {
        const slots = fetchAvailableTimeSlots(doctor, date);
        setAvailableTimeSlots(slots);
        setAvailableCount(slots.length); // Update the count of available slots
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setAppointmentData({ ...appointmentData, image: reader.result }); // Store Base64 string
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const fetchAvailableTimeSlots = (doctor, date) => {
    const existingAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const bookedSlots = existingAppointments
      .filter((appointment) => appointment.doctor === doctor && appointment.date === date)
      .map((appointment) => appointment.timeSlot);

    return timeSlots.filter((slot) => !bookedSlots.includes(slot));
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
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#007bff' }}>Post Appointment</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {/* Hospital Name */}
        <div>
          <label style={{ fontWeight: 'bold' }}>Hospital:</label>
          <input
            type="text"
            name="hospital"
            value={appointmentData.hospital}
            onChange={handleChange}
            required
            placeholder="Enter Hospital Name"
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '5px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        {/* Doctor Name */}
        <div>
          <label style={{ fontWeight: 'bold' }}>Doctor:</label>
          <input
            type="text"
            name="doctor"
            value={appointmentData.doctor}
            onChange={handleChange}
            required
            placeholder="Enter Doctor's Name"
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '5px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        {/* Appointment Date */}
        <div>
          <label style={{ fontWeight: 'bold' }}>Date:</label>
          <input
            type="date"
            name="date"
            value={appointmentData.date}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '5px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        {/* Available Slots Count */}
        {availableCount > 0 && (
          <p style={{ color: '#28a745', fontWeight: 'bold' }}>
            {availableCount} time slots available for the selected doctor and date.
          </p>
        )}
        {availableCount === 0 && appointmentData.doctor && appointmentData.date && (
          <p style={{ color: '#dc3545', fontWeight: 'bold' }}>
            No time slots available for the selected doctor and date.
          </p>
        )}

        {/* Time Slot Selection */}
        <div>
          <label style={{ fontWeight: 'bold' }}>Time Slot:</label>
          <select
            name="timeSlot"
            value={appointmentData.timeSlot}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '5px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          >
            <option value="">Select Time Slot</option>
            {availableTimeSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label style={{ fontWeight: 'bold' }}>Description:</label>
          <textarea
            name="description"
            value={appointmentData.description}
            onChange={handleChange}
            required
            placeholder="Enter Appointment Description"
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '5px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              resize: 'none',
            }}
          />
        </div>

        {/* Image Upload */}
        <div>
          <label style={{ fontWeight: 'bold' }}>Upload Image:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '5px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        {/* Submit Button */}
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
          Post Appointment
        </button>
      </form>
    </div>
  );
};

export default PostAppointments;