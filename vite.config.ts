import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis', // Polyfill for global
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis', // Ensure esbuild recognizes global
      },
    },
  },
});