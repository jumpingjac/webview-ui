import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.', // assuming index.html is in the root
  build: {
    outDir: 'dist',
  },
});
