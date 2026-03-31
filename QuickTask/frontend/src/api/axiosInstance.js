import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// Request interceptor – attach JWT from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('qt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor – handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('qt_token');
      localStorage.removeItem('qt_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
