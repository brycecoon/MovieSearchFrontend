import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://moviesearch.duckdns.org',
        // target: 'http://localhost:5152',
        changeOrigin: true,
      },
    },
  },
})
