import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    https: {
      key: fs.readFileSync('C:/Users/J/Documents/ppprueba/key.pem'),  // Ruta de la clave privada
      cert: fs.readFileSync('C:/Users/J/Documents/ppprueba/cert.pem'), // Ruta del certificado
    }
  }
})
