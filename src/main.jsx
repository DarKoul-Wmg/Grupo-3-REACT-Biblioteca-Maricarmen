import { StrictMode, useContext } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./contexts/authcontext";
import { ThemeProvider, ThemeContext } from "./contexts/themecontext";
import "./index.css";
import { ToastProvider } from "./contexts/toastcontext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";

import { API_URL } from "./services/api";

/*Client ID para acceder al auth de google*/
const clientId = "24541393337-df41pocq7fcqup1js9dr7816b2d5pq14.apps.googleusercontent.com";

/*Client ID para acceder al auth de MICROSOFT*/
const msalConfig = {
  auth: {
    clientId: "bcda1a3f-9cc5-4287-814b-d1d3d975a671",
    authority: "https://login.microsoftonline.com/common", // o tu tenant
    // redirectUri: API_URL,
    redirectUri: "http://localhost:5173",
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

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
    <MsalProvider instance={msalInstance}>
      <AuthProvider>
        <ThemeProvider>
          <ToastProvider>
            <AppWithTheme />
          </ToastProvider>
        </ThemeProvider>
      </AuthProvider>
    </MsalProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
