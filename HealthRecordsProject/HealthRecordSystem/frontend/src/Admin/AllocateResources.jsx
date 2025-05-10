import React, { useState, useEffect } from 'react';
import './AllocateResources.css';
const AllocateResources = () => {
  const [beds, setBeds] = useState([]);
  const [allocations, setAllocations] = useState([]);
  const [newBedName, setNewBedName] = useState('');
  const [selectedBedId, setSelectedBedId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [date, setDate] = useState('');
  const [filter, setFilter] = useState('');

  // Load data from localStorage when the page loads
  useEffect(() => {
    try {
      const storedBeds = JSON.parse(localStorage.getItem('beds')) || [];
      const storedAllocations = JSON.parse(localStorage.getItem('allocations')) || [];
      setBeds(storedBeds);
      setAllocations(storedAllocations);
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }, []);

  // Debounce function to reduce frequent writes to localStorage
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  // Save beds to localStorage with debounce
  const saveBedsToLocalStorage = debounce((beds) => {
    try {
      localStorage.setItem('beds', JSON.stringify(beds));
    } catch (error) {
      console.error('Error saving beds to localStorage:', error);
    }
  }, 500);

  // Save allocations to localStorage with debounce
  const saveAllocationsToLocalStorage = debounce((allocations) => {
    try {
      localStorage.setItem('allocations', JSON.stringify(allocations));
    } catch (error) {
      console.error('Error saving allocations to localStorage:', error);
    }
  }, 500);

  // Update localStorage whenever beds or allocations change
  useEffect(() => {
    saveBedsToLocalStorage(beds);
  }, [beds]);

  useEffect(() => {
    saveAllocationsToLocalStorage(allocations);
  }, [allocations]);

  const handleAddBed = (e) => {
    e.preventDefault();
    if (!newBedName) {
      alert('Enter bed name!');
      return;
    }

    // Check for duplicate bed names
    if (beds.some((bed) => bed.name === newBedName)) {
      alert('Bed name already exists!');
      return;
    }

    const newBed = {
      id: Date.now(), // Unique ID
      name: newBedName,
      status: 'Free',
    };
    setBeds([...beds, newBed]);
    setNewBedName('');
  };

  const handleAllocateBed = (e) => {
    e.preventDefault();
    if (!selectedBedId || !patientName || !date) {
      alert('Please fill all fields');
      return;
    }

    const bedIndex = beds.findIndex((bed) => bed.id === parseInt(selectedBedId));
    if (bedIndex === -1 || beds[bedIndex].status !== 'Free') {
      alert('Selected bed is not free!');
      return;
    }

    const updatedBeds = [...beds];
    updatedBeds[bedIndex].status = 'Occupied';
    setBeds(updatedBeds);

    const allocation = {
      id: Date.now(),
      bedName: updatedBeds[bedIndex].name,
      patientName,
      date,
    };
    setAllocations([...allocations, allocation]);

    setSelectedBedId('');
    setPatientName('');
    setDate('');
  };

  const handleCancelAllocation = (allocationId) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this allocation?');
    if (!confirmCancel) return;

    const allocation = allocations.find((a) => a.id === allocationId);
    if (!allocation) return;

    const updatedBeds = beds.map((bed) =>
      bed.name === allocation.bedName ? { ...bed, status: 'Free' } : bed
    );
    setBeds(updatedBeds);

    const updatedAllocations = allocations.filter((a) => a.id !== allocationId);
    setAllocations(updatedAllocations);
  };

  const filteredBeds = beds.filter((bed) =>
    bed.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleExport = () => {
    const data = {
      beds,
      allocations,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hospital_data.json';
    a.click();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Allocate Resources - Admin Panel</h2>

      {/* Add Beds */}
      <section style={{ marginBottom: '30px' }}>
        <h3>Add New Bed</h3>
        <form onSubmit={handleAddBed}>
          <input
            type="text"
            value={newBedName}
            onChange={(e) => setNewBedName(e.target.value)}
            placeholder="Enter new bed name"
          />
          <button type="submit" style={{ marginLeft: '10px' }}>Add Bed</button>
        </form>
      </section>

      {/* Show Beds */}
      <section style={{ marginBottom: '30px' }}>
        <h3>All Beds</h3>
        <input
          type="text"
          placeholder="Search beds..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Bed Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredBeds.map((bed) => (
              <tr key={bed.id}>
                <td>{bed.name}</td>
                <td style={{ color: bed.status === 'Free' ? 'green' : 'red' }}>{bed.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Allocate Bed */}
      <section style={{ marginBottom: '30px' }}>
        <h3>Allocate Bed to Patient</h3>
        <form onSubmit={handleAllocateBed}>
          <div>
            <label>Patient Name: </label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Enter patient name"
            />
          </div>

          <div>
            <label>Select Free Bed: </label>
            <select
              value={selectedBedId}
              onChange={(e) => setSelectedBedId(e.target.value)}
            >
              <option value="">Select Bed</option>
              {beds.filter((bed) => bed.status === 'Free').map((bed) => (
                <option key={bed.id} value={bed.id}>{bed.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Date: </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <button type="submit" style={{ marginTop: '10px' }}>Allocate Bed</button>
        </form>
      </section>

      {/* Allocations */}
      <section>
        <h3>Current Allocations</h3>
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Bed Name</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allocations.map((allocation) => (
              <tr key={allocation.id}>
                <td>{allocation.patientName}</td>
                <td>{allocation.bedName}</td>
                <td>{allocation.date}</td>
                <td>
                  <button onClick={() => handleCancelAllocation(allocation.id)}>
                    Cancel Allocation
                  </button>
                </td>
              </tr>
            ))}
            {allocations.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>No Allocations Yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AllocateResources;