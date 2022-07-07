module.exports = {
  content: ['./src/**/*.vue'],
  safelist: [
    {
      pattern: /text-(black|warning|error|success|lavender|chili|papaya)/
    },
    {
      pattern: /text-(primary|secondary|lemon|turquoise|flint|mint|coral|gray|white)-(100|200|300|500|700|900)/
    }
  ],
  plugins: [
    require('tailwind-plugin-lob')
  ]
};
