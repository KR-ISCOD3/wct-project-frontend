import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,       // Allow Vite to accept connections from Docker
    port: 5173,       // Optional: specify port explicitly
    strictPort: true, // Optional: ensures Vite uses 5173 or fails
  }
})
