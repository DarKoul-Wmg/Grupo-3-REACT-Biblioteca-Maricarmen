import React, { useState, createContext, useContext } from "react";
import Toast from "../components/ui/custom-toast";
const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (type, message) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, type, message }]);

    // Remover el toast después de 3 segundos
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2">
        {toasts.map((toast) => (
          <Toast key={toast.id} type={toast.type}>
            {toast.message}
          </Toast>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
