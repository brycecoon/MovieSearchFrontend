import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // target: 'http://moviesearch.duckdns.org',
        target: 'http://localhost:5252',
        changeOrigin: true,
      },
    },
  },
})
