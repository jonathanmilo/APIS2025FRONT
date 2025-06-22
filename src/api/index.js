import axios from 'axios';
import { API_URL } from '../global/store';

const api = axios.create({
  baseURL: API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

const our_api = axios.create({
  baseURL: "http://localhost:8080", 
  headers: {
    'Content-Type': 'application/json',
  },
});

// agrega token al encabezado de cada solicitud
api.interceptors.request.use(
  (config) => {
    const { token } = JSON.parse(localStorage.getItem('user')) || {}; 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export {api, our_api};