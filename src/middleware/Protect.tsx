

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectProps {
  children: React.ReactNode;
}

const Protect: React.FC<ProtectProps> = ({ children }) => {
  // const isAuthenticated = Boolean(localStorage.getItem('accessToken')); // Example authentication check
  // const location = useLocation();

  // if (!isAuthenticated) {
  //   return <Navigate to='/sign-in' state={{ from: location }} replace />;
  // }

  return <>{children}</>;
};

export default Protect;
