// Basic skeleton for auth service
const login = (credentials) => {
  return fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json());
};

export default { login };
