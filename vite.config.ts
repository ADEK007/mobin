import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/mobin/',  // ⚠️ MUST match your GitHub repo name
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
