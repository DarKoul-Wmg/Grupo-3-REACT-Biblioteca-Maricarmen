import React, { createContext, useState } from "react";
import { API_URL } from "../services/api";

export const AuthContext = createContext({
  user: null, // Información del usuario logueado
  login: () => {}, // Función para iniciar sesión
  logout: () => {}, // Función para cerrar sesión
  setActiveComponent: () => {}, // Función para cambiar el componente activo
  setUserToken: () => {}, //set token de usuario
  userToken: null, //token de usuario
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [activeComponent, setActiveComponent] = useState("UserDetails");

  const login = (userData) => {
    setUser(userData);

    if (userData?.groups?.includes("Administrador")) {
      let adminUrl = API_URL;

      if (API_URL.includes(":8000")) {
        adminUrl = API_URL.slice(0, -4) + "/admin";
      } else {
        adminUrl = API_URL.replace("/api", "/admin");
      }

      window.location.href = adminUrl;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        activeComponent,
        setActiveComponent,
        userToken,
        setUserToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
