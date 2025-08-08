import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../api'; // Correct way to import userApi

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
    profilePhoto: null,
    phoneNumber: '',
    address: '',
    gender: '',
    age: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    const { username, email, password, phoneNumber, address, gender, age } = formData;

    if (!email || !password) {
      setMessage('Please enter email and password.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address.');
      return false;
    }

    if (!isLogin && (!username || !phoneNumber || !address || !gender || !age)) {
      setMessage('Please fill in all required fields for signup.');
      return false;
    }

    return true;
  };

  const handleProfilePhotoChange = (e) => {
    setFormData({ ...formData, profilePhoto: e.target.files[0] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setMessage('');

    try {
      if (isLogin) {
        // Login
        const response = await userApi.loginUser(formData.email, formData.password);
        const user = response.data;

        if (user && user.email) {
          setMessage('Login successful!');
          localStorage.setItem('user', JSON.stringify(user)); // Save user data in localStorage
          navigate('/user-profile'); // Navigate to UserProfile.jsx
        } else {
          setMessage('Invalid credentials.');
        }
      } else {
        // Signup
        const {
          username, email, password, role,
          profilePhoto, phoneNumber, address, gender, age
        } = formData;

        const form = new FormData();
        form.append('username', username);
        form.append('email', email);
        form.append('password', password);
        form.append('role', role);
        form.append('phoneNumber', phoneNumber);
        form.append('address', address);
        form.append('gender', gender);
        form.append('age', age);
        if (profilePhoto) form.append('profilePhoto', profilePhoto);

        const response = await userApi.registerUser(form);
        const newUser = response.data;

        if (newUser && newUser.email) {
          setMessage('Signup successful! Please sign in.');
          setIsLogin(true);
          setFormData({
            username: '',
            email: '',
            password: '',
            role: 'user',
            profilePhoto: null,
            phoneNumber: '',
            address: '',
            gender: '',
            age: '',
          });
        } else {
          setMessage('Signup failed. Try again.');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage(
        error.response?.data?.message || 'Server error. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isLogin ? 'Sign in to your account' : 'Create your account'}</h2>
        <p>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage('');
            }}
            className="toggle-btn"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </span>
        </p>

        {message && <p className="status-msg">{message}</p>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <input
                id="username"
                name="username"
                type="text"
                className="form-input"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="form-group">
            <input
              id="email"
              name="email"
              type="email"
              className="form-input"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input
              id="password"
              name="password"
              type="password"
              className="form-input"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {!isLogin && (
            <>
              <div className="form-group">
                <select
                  id="role"
                  name="role"
                  className="form-input"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="doctor">doctor</option>
                </select>
              </div>

              <div className="form-group">
                <input
                  id="profilePhoto"
                  name="profilePhoto"
                  type="file"
                  className="form-input"
                  onChange={handleProfilePhotoChange}
                />
              </div>

              <div className="form-group">
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  className="form-input"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <input
                  id="address"
                  name="address"
                  type="text"
                  className="form-input"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <select
                  id="gender"
                  name="gender"
                  className="form-input"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <input
                  id="age"
                  name="age"
                  type="number"
                  className="form-input"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Processing...' : isLogin ? 'Sign in' : 'Sign up'}
          </button>
        </form>

        {isLogin && (
          <div className="forgot-password-link">
            <a href="/forgot-password">Forgot your password?</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
