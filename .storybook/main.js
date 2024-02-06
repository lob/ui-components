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

  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },

  docs: {
    autodocs: true
  }
};
