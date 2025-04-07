import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    outDir: 'dist', // Carpeta de salida (puedes cambiarla a 'build' si lo prefieres)
    assetsDir: 'static', // Cambia 'assets' por 'static'
  },
});
