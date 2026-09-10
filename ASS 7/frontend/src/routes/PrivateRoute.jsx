import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Wrap any route element that requires a logged-in user:
// <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
export default function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}
