import axios from 'axios';
import { supabase } from './supabaseClient';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Token to Requests
api.interceptors.request.use(
  async (config) => {
    // Get the Supabase session token
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    
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
        // Try to refresh the Supabase session
        const { data, error: refreshError } = await supabase.auth.refreshSession();
        
        if (refreshError) {
          console.error('Session refresh failed:', refreshError);
          return handleLogout();
        }

        if (data?.session) {
          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${data.session.access_token}`;
          return api(originalRequest);
        } else {
          return handleLogout();
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        return handleLogout();
      }
    }

    return Promise.reject(error);
  }
);

const handleLogout = () => {
  // Sign out from Supabase
  supabase.auth.signOut();
  window.location.href = '/sign-in'; // Redirect to login page
  return Promise.reject({ message: 'Session expired. Redirecting to login.' });
};

export default api;