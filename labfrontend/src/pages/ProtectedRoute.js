import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ requiredRole }) => {
  const isLoggedIn = Boolean(localStorage.getItem('token')); // Example authentication check
  const userRole = localStorage.getItem('role'); // Example role retrieval

  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (requiredRole && userRole !== requiredRole) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
