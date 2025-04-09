import React, { createContext, useState } from "react";

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
    console.log("USER EN CONTEXT ", userData);
    setUser(userData);
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
