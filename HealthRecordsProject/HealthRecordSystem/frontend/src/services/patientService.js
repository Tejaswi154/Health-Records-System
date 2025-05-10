const getMedicalHistory = () => {
  return fetch('/api/patient/history').then(res => res.json());
};

export default { getMedicalHistory };
