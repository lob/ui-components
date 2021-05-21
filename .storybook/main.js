const path = require('path');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-docs"
  ],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'vue-style-loader', 
        'css-loader',
        {
          loader: 'sass-loader',
  		    options: {
  			    additionalData: '@import "src/assets/styles/mixins.scss";'
          } 
        }
      ],
      include: path.resolve(__dirname, '../'),
    });
    return config;
  },
}
