import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/mobin/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
