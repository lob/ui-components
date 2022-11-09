const plugin = require('tailwindcss/plugin');
module.exports = {
  content: ['./src/**/*.vue'],
  safelist: [
    { pattern: /text-(xl|2xl|3xl|4xl|5xl)/ },
    { pattern: /text-(black|white|warning|error|success|lavender|chili|papaya|paper)/ },
    { pattern: /text-(primary|secondary|lemon|turquoise|flint|mint|coral|gray|white|coolGray|purple|blue|red|orange|yellow|green)-(50|100|200|300|400|500|600|700|800|900)/ }
  ],
  theme: {
    fontFamily: {
      messina: ['Messina', 'sans-serif']
    }
  },
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
