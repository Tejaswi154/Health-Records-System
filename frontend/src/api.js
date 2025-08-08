import axios from 'axios';

// Base URLs for different APIs
const USER_API_BASE_URL = 'http://localhost:8091/api/users'; // Base URL for user-related APIs
const BOOKING_API_BASE_URL = 'http://localhost:8091/api/bookings'; // Base URL for booking-related APIs

// API functions to interact with the backend
const userApi = {
  registerUser: async (formData) => {
    return axios.post(`${USER_API_BASE_URL}/register`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  loginUser: async (email, password) => {
    return axios.post(`${USER_API_BASE_URL}/login`, { email, password });
  },
  logoutUser: async (email) => {
    return axios.post(`${USER_API_BASE_URL}/logout`, null, { params: { email } });
  },
  getUserByEmail: async (email) => {
    return axios.get(`${USER_API_BASE_URL}/user`, { params: { email } });
  },
  updateUser: async (id, updatedUser) => {
    return axios.put(`${USER_API_BASE_URL}/update/${id}`, updatedUser);
  },
  getAllUsers: async () => {
    return axios.get(`${USER_API_BASE_URL}/all`);
  },
  deleteUser: async (id) => {
    return axios.delete(`${USER_API_BASE_URL}/${id}`);
  },
};

const bookingApi = {
  createBooking: async (bookingData) => {
    return axios.post(`${BOOKING_API_BASE_URL}`, bookingData);
  },
  getBookingsByUserId: async (userId) => {
    return axios.get(`${BOOKING_API_BASE_URL}/${userId}`);
  },
  getAllBookings: async () => {
    return axios.get(`${BOOKING_API_BASE_URL}`);
  },
};

// Export userApi and bookingApi as named exports
export { userApi, bookingApi };
