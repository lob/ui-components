const plugin = require('tailwindcss/plugin');
module.exports = {
  content: ['./src/**/*.vue'],
  safelist: [
    { pattern: /text-(xl|2xl|3xl|4xl|5xl)/ },
    { pattern: /text-(black|warning|error|success|lavender|chili|papaya)/ },
    { pattern: /text-(primary|secondary|lemon|turquoise|flint|mint|coral|gray|white)-(100|200|300|500|700|900)/ }
  ],
  plugins: [
    require('tailwind-plugin-lob'),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'bg-gradient': (angle) => ({
            'background-image': `linear-gradient(${angle}, var(--tw-gradient-stops))`
          })
        },
        {
          values: Object.assign(
            theme('bgGradientDeg', {}),
            {
              114: '114deg'
            }
          )
        }
      );
    })
  ]
};
