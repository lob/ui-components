import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import dts from 'vite-plugin-dts';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'ui-components',
      fileName: (format) => `ui-components.${format}.js`
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
    }
  },
  plugins: [vue(), svgLoader(), dts()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    dedupe: ['vue'],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: 'setupTests.js',
    coverage: {
      include: ['src/**/*.{js,vue}'],
      exclude: [
        'src/**/index.{js,ts}', // No need to cover index files for exports
        'src/main.js', // No need to cover bootstrap file
        'src/**/*.spec.{js,ts}', // No need to cover test files
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
