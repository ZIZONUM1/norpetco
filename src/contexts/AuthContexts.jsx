import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [userData, setUserData] = useState(() => {
    const stored = localStorage.getItem("userData");
    try {
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const login = ( token, userData ) => {
    setToken(token);
    setUserData(userData);
    localStorage.setItem("token", token);
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUserData(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
  };
  const checkExpiredToken = () => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // in seconds
      return decodedToken.exp < currentTime;
    }
    return false;
  }
  const isAuthenticated = !!token;

   // ✅ Optional: sync across tabs
  useEffect(() => {
    const handleStorage = () => {
      const newToken = localStorage.getItem("token");
      const newUserData = localStorage.getItem("userData");

      setToken(newToken);
      setUserData(newUserData ? JSON.parse(newUserData) : null);
    };
    if (checkExpiredToken()) logout();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <AuthContext.Provider value={{ token, userData, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
