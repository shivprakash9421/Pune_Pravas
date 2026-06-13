import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // This tells Vite to securely route our map requests to Mappls
      '/mappls-token': {
        target: 'https://outpost.mappls.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mappls-token/, '')
      }
    }
  }
})