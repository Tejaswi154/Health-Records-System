import React, { useState, useEffect } from 'react';

const HealthRecord = () => {
  const [username, setUsername] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [recordDescription, setRecordDescription] = useState('');
  const [healthRecords, setHealthRecords] = useState([]);

  // Fetch the records from localStorage on component mount
  useEffect(() => {
    const storedRecords = JSON.parse(localStorage.getItem('healthRecords')) || [];
    setHealthRecords(storedRecords);
  }, []);

  // Save records to localStorage
  const saveRecordsToLocalStorage = (newRecords) => {
    localStorage.setItem('healthRecords', JSON.stringify(newRecords));
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (username && doctorName && recordDescription) {
      const newRecord = {
        username,
        doctorName,
        description: recordDescription,
        date: new Date().toLocaleDateString(),
      };

      // Update health records state
      const updatedRecords = [...healthRecords, newRecord];
      setHealthRecords(updatedRecords);

      // Save the updated records in localStorage
      saveRecordsToLocalStorage(updatedRecords);

      // Clear the form inputs
      setUsername('');
      setDoctorName('');
      setRecordDescription('');
    } else {
      alert('Please fill all fields.');
    }
  };

  return (
    <div className="health-record">
      <h2>Health Record Management</h2>
      
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="doctorName">Doctor's Name: </label>
          <input
            type="text"
            id="doctorName"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="recordDescription">Record Description: </label>
          <textarea
            id="recordDescription"
            value={recordDescription}
            onChange={(e) => setRecordDescription(e.target.value)}
            required
          />
        </div>

        <button type="submit">Add Health Record</button>
      </form>

      <h3>Health Records</h3>
      {healthRecords.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Doctor's Name</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {healthRecords.map((record, index) => (
              <tr key={index}>
                <td>{record.username}</td>
                <td>{record.doctorName}</td>
                <td>{record.description}</td>
                <td>{record.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No records available.</p>
      )}
    </div>
  );
};

export default HealthRecord;
