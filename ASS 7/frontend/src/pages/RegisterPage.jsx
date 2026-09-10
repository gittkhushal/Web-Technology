import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="page auth-page">
      <h1>Create an Account</h1>
      <RegisterForm />
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}
