import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.js'),
      name: 'ui-components',
      fileName: (format) => `ui-components.${format}.js`
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  rollupOptions: {
    // make sure to externalize deps that shouldn't be bundled
    // into your library
    external: ['vue'],
    output: {
      // Provide global variables to use in the UMD build
      // for externalized deps
      globals: {
        vue: 'Vue'
      }
    }
  },
  test: {
    environment: 'jsdom',
    globals: true
    // TODO: coverage
  }
});
