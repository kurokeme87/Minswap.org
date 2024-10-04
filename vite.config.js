import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from 'vite-plugin-wasm'

export default defineConfig({
  plugins: [react(), wasm()],
  build: {
    target: 'esnext',
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
    },
  },
  server: {
    proxy: {
      '/ipqualityscore': {
        target: 'https://ipqualityscore.com',   // Proxy requests to the IPQS API
        changeOrigin: true,                     // Handle cross-origin issues
        rewrite: (path) => path.replace(/^\/ipqualityscore/, ''),  // Remove the '/ipqualityscore' prefix
        secure: true,                           // Ensure secure HTTPS connection
      },
    },
  },
})
