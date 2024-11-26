import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
        additionalData: `
          @use "${path.resolve(__dirname, 'src/styles/constants.scss')}" as *;
          @use "${path.resolve(__dirname, 'src/styles/breakpoints.scss')}" as *;
        `,
      },
    },
  },
});
