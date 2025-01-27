import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ requiredRole }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!user;

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role?.toLowerCase() !== requiredRole.toLowerCase()) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
