import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Allow public access to the landing page
  if (location.pathname === '/') {
    return <>{children}</>;
  }

  if (loading) {
    // Show a loading indicator while checking auth status
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Instead of redirecting to /sign-in, we'll show a message
    // In a real app, you might want to show a login button or modal
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Authentication Required
          </h2>
          <p className="text-gray-600 text-center mb-6">
            You need to be logged in to access this page.
          </p>
          <p className="text-gray-600 text-center mb-6">
            Please use the "Sign In" button in the navigation bar to log in.
          </p>
        </div>
      </div>
    );
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;