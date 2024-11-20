import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "${path.resolve(__dirname, 'src/styles/constants.scss')}";
          @import "${path.resolve(__dirname, 'src/styles/breakpoints.scss')}";
        `,
      },
    },
  },
});
