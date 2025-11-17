import axios from 'axios';

const baseURL = window.location.hostname.endsWith('.vercel.app')
  ? 'http://13.204.47.170:3000'  
  : 'http://localhost:3000';   


const api = axios.create({ baseURL });

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export { api };
