import React, { createContext, useContext, useState } from "react";
import { loginUser, registerUser } from "../api/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email, password) => {
    const { data } = await loginUser({ email, password });
    persistSession(data);
    return data;
  };

  const register = async (fullName, email, password) => {
    const { data } = await registerUser({ fullName, email, password });
    persistSession(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const persistSession = (data) => {
    // data: { token, tokenType, userId, fullName, email, role }
    localStorage.setItem("token", data.token);
    const userInfo = {
      userId: data.userId,
      fullName: data.fullName,
      email: data.email,
      role: data.role,
    };
    localStorage.setItem("user", JSON.stringify(userInfo));
    setUser(userInfo);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
