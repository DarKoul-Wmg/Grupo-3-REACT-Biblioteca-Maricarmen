import { StrictMode, useContext } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./contexts/authcontext";
import { ThemeProvider, ThemeContext } from "./contexts/themecontext";
import "./index.css";

// Un wrapper para inyectar la clase dark directamente en el #root
function AppWithTheme() {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <div id="root-container" className={isDarkMode ? "dark" : ""}>
      <App />
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <AppWithTheme />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
