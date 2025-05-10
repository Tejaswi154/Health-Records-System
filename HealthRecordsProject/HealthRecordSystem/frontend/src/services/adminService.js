const manageStaff = () => {
  return fetch('/api/admin/staff').then(res => res.json());
};

export default { manageStaff };
