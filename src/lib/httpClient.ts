import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  // baseURL: 'http://localhost:3000/api', 
  baseURL: 'https://dev.ryzer.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Token to Requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // Fetch token from storage
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
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      console.error('Network error: No response received.');
      return Promise.reject({ message: 'Network Error' });
    }

    const { status } = error.response;

    if (status === 401 || status === 403) {
      console.warn('Unauthorized request: Attempting to refresh token.');

      try {
        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
          console.error('No refresh token found. Redirecting to login.');
          return handleLogout();
        }

        const { data } = await axios.post('https://test.fandora.app/api/v2/admin/refresh', { refreshToken });

        localStorage.setItem('accessToken', data.data.accessToken);

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        return handleLogout();
      }
    }

    return Promise.reject(error);
  }
);

const handleLogout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  window.location.href = '/sign-in'; // Redirect to login page
  return Promise.reject({ message: 'Session expired. Redirecting to login.' });
};


export default api;
