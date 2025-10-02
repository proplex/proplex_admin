import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:3001/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Token to Requests
api.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem('authToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Token Expiry & Errors
api.interceptors.response.use(
  (response) => response, // Return response as is if successful
  (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      console.error('Network error: No response received.');
      return Promise.reject({ message: 'Network Error' });
    }

    const { status } = error.response;

    if (status === 401 || status === 403) {
      console.warn('Unauthorized request: Token may be expired.');
      // Clear token from localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      // Reload the page to reflect the logged out state
      window.location.reload();
      return Promise.reject({ message: 'Session expired. Please log in again.' });
    }

    return Promise.reject(error);
  }
);

export default api;