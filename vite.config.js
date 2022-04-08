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
    dedupe: ['vue'],
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
    },
    resolve: {
      dedupe: ['vue']
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      include: ['src/**/*.{js,vue}'],
      exclude: [
        'src/**/index.js', // No need to cover index files for exports
        'src/main.js', // No need to cover bootstrap file
        'src/**/*.spec.js', // No need to cover test files
        'src/**/*.stories.js', // No need to cover stories files
        'src/theme/**', // No need to cover components just for showing theming
        'src/components/Icons/**' // No need to cover components just for rendering svg icons
      ],
      branches: 80,
      functions: 80,
      lines: 80
    }
  }
});
