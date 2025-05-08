import { StrictMode, useContext } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./contexts/authcontext";
import { ThemeProvider, ThemeContext } from "./contexts/themecontext";
import "./index.css";
import { ToastProvider } from "./contexts/toastcontext";
import { GoogleOAuthProvider } from "@react-oauth/google";

/*Client ID para acceder al auth de google*/
const clientId = "24541393337-df41pocq7fcqup1js9dr7816b2d5pq14.apps.googleusercontent.com";
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
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <ThemeProvider>
          <ToastProvider>
            <AppWithTheme />
          </ToastProvider>
        </ThemeProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
