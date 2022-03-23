import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const path = require('path');

export default defineConfig({
  // https://vitejs.dev/config/
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
