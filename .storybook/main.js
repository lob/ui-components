const path = require('path');

const { mergeConfig } = require('vite');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-postcss'
  ],
  staticDirs: ['../src/assets/images'],
  core: {
    builder: '@storybook/builder-vite'
  },
  async viteFinal (config) {
    return mergeConfig(config, {
      // temp comment for HELP: docs say to do this but it throws module import error
      // resolve: (await import('../vite.config.js')).default.resolve,
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src')
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
      }
    });
  }
};
