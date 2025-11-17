import axios from 'axios';

const isVercel = window.location.hostname.endsWith('.vercel.app');

const baseURL = isVercel
  ? 'http://13.204.47.170:3000' 
  : 'http://localhost:3000';

const api = axios.create({ baseURL });

// Add JWT token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export { api };
