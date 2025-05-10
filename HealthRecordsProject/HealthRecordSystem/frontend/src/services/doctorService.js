const getAppointments = () => {
  return fetch('/api/doctor/appointments').then(res => res.json());
};

export default { getAppointments };
