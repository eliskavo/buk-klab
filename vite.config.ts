import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
        additionalData: `
           @use "${path.resolve(__dirname, 'src/styles/constants.scss')}" as *;
          @use "${path.resolve(__dirname, 'src/styles/breakpoints.scss')}" as *;
          @use "${path.resolve(__dirname, 'src/styles/colors.scss')}" as *;
        `,
      },
    },
  },
});
