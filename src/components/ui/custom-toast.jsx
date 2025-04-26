import React, { useEffect, useState } from "react";

export default function Toast({ type = "info", children }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  const typeStyles = {
    info: {
      borderColor: "border-blue-500",
      textColor: "text-blue-500",
      icon: (
        <svg
          className="shrink-0 size-4 mt-0.5"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
        </svg>
      ),
    },
    success: {
      borderColor: "border-teal-500",
      textColor: "text-teal-500",
      icon: (
        <svg
          className="shrink-0 size-4 mt-0.5"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
        </svg>
      ),
    },
    error: {
      borderColor: "border-red-500",
      textColor: "text-red-500",
      icon: (
        <svg
          className="shrink-0 size-4 mt-0.5"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
        </svg>
      ),
    },
    warning: {
      borderColor: "border-yellow-500",
      textColor: "text-yellow-500",
      icon: (
        <svg
          className="shrink-0 size-4 mt-0.5"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
        </svg>
      ),
    },
  };

  const { borderColor, textColor, icon } = typeStyles[type] || typeStyles.info;

  return (
    <div
      className={`max-w-xs bg-white border ${borderColor} rounded-xl shadow-lg transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      role="alert"
    >
      <div className="flex p-4">
        <div className="shrink-0">{icon}</div>
        <div className="ms-3">
          <p className={`text-sm ${textColor}`}>{children}</p>
        </div>
      </div>
    </div>
  );
}
