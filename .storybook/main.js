module.exports = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y'
  ],

  staticDirs: ['../src/assets/images'],

  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },

  docs: {}
};
