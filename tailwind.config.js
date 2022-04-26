module.exports = {
  content: ['./src/**/*.vue'],
  plugins: [
    require('tailwind-plugin-lob')
  ],
  variants: {
    extend: {
      width: ['hover'],
      padding: ['hover']
    }
  }
};
