import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

function setCookie(name, value, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Strict`;
}

function getCookie(name) {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => getCookie("theme") || "system");

  useEffect(() => {
    const root = document.getElementById("root");
    if (!root) return;

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const shouldBeDark =
      theme === "dark" || (theme === "system" && prefersDark);

    root.classList.toggle("dark", shouldBeDark);
    setCookie("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
