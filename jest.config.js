module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/**/index.js', // No need to cover index files for exports
    '!src/main.js', // No need to cover bootstrap file
    '!src/**/*.stories.js', // No need to cover stories file
    '!src/theme/**' // No need to cover components just for showing theming
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80
    }
  }
};
