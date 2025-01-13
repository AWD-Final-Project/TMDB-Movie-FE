import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  isAuthenticated: false,
  login: ({
    accessToken,
    refreshToken,
    user: { id },
  }: {
    accessToken: string;
    refreshToken: string;
    user: { id: string };
  }) => {
    console.log(accessToken, refreshToken, id);
  },
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const navigate = useNavigate();

  // On login, store token and update state
  const login = ({
    accessToken,
    refreshToken,
    user: { id },
  }: {
    accessToken: string;
    refreshToken: string;
    user: { id: string };
  }) => {
    localStorage.setItem("token", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userId", id);
    setToken(accessToken);
    setIsAuthenticated(true);
  };

  // On logout, remove token and reset state
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    setToken(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
