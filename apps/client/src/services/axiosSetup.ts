import axios from 'axios';

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const isShortUrl = /^\/[a-zA-Z0-9-_]+$/.test(window.location.pathname);
    if (
      error.response.status === 401 &&
      !isShortUrl &&
      window.location.pathname !== '/'
    ) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
