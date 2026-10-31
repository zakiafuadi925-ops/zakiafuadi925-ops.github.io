<<<<<<< HEAD
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
=======
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
>>>>>>> 52d392f (update App and config)

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
<<<<<<< HEAD
  base: '/',
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
  },
})
=======
  base: "/",
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    include: ["react", "react-dom", "lucide-react"],
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    allowedHosts: true,
  },
});
>>>>>>> 52d392f (update App and config)
