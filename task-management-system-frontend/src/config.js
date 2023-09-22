import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7222/api', // backend API
});

export default api;