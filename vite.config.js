import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
const API_BASE = import.meta.env.VITE_API_URL || ''

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': '',
    },
  },
})
