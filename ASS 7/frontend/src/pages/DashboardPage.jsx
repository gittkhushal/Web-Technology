import React from "react";
import { useAuth } from "../context/AuthContext";

// Example of a page only visible to logged-in users (wrapped in PrivateRoute in App.js)
export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="page">
      <h1>My Dashboard</h1>
      <p>Welcome back, {user?.fullName}.</p>
      <p>Email: {user?.email}</p>
      {/* Add order history, saved books, profile settings, etc. here */}
    </div>
  );
}
