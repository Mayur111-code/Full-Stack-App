import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Local Storage se token check kar lo
  const token = localStorage.getItem("token");

  // Agar token nahi mila to login page bhej do
  if (!token) {
    return <Navigate to="/user/login" replace />;
  }

  // Agar token mila to page render hone do
  return children;
};

export default ProtectedRoute;
