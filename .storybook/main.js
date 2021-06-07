const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-docs",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-postcss",
  ],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ["vue-style-loader", "css-loader", "sass-loader", "postcss-loader"],
      include: path.resolve(__dirname, "../"),
    });
    return config;
  },
};
