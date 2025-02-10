import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  // Redirect to login if no user is logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Admin access control: Only allow users with 'admin' role to access /admin
  if (window.location.pathname === '/admin' && user.role?.toLowerCase() !== 'admin') {
    return <Navigate to="/profile" />;
  }

  // Allow access if authenticated
  return <Outlet />;
};

export default ProtectedRoute;
