const plugin = require('tailwindcss/plugin');
module.exports = {
  content: ['./src/**/*.vue'],
  safelist: [
    { pattern: /text-(xl|2xl|3xl|4xl|5xl)/ },
    { pattern: /text-(black|warning|error|success|lavender|chili|papaya)/ },
    { pattern: /text-(primary|secondary|lemon|turquoise|flint|mint|coral|gray|white)-(100|200|300|500|700|900)/ }
  ],
  theme: {
    fontFamily: {
      messina: ['Messina', 'sans-serif']
    }
  },
  plugins: [
    require('tailwind-plugin-lob'),
    plugin(function ({ addComponents, matchUtilities, theme }) {
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

      addComponents({
        '.type-display-1': {
          fontSize: '4.5rem', //72px
          fontWeight: '700',
          lineHeight: 1
        },
        '.type-display-2': {
          fontSize: '3rem', //48px
          fontWeight: '700',
          lineHeight: 1
        },
        '.type-header-1': {
          fontSize: '3rem', //48px
          fontWeight: '600',
          lineHeight: 1
        },
        '.type-header-2': {
          fontSize: '2.25rem', //36px
          fontWeight: '600',
          lineHeight: 1.1
        },
        '.type-header-3': {
          fontSize: '1.875rem', //30px
          fontWeight: '600',
          lineHeight: 1.2
        },
        '.type-header-4': {
          fontSize: '1.5rem', //24px
          fontWeight: '600',
          lineHeight: 1.33
        },
        '.type-xl-300': {
          fontSize: '1.25rem', //20px
          fontWeight: '300',
          lineHeight: 1.4
        },
        '.type-xl-400': {
          fontSize: '1.25rem', //20px
          fontWeight: '400',
          lineHeight: 1.4
        },
        '.type-xl-500': {
          fontSize: '1.25rem', //20px
          fontWeight: '500',
          lineHeight: 1.4
        },
        '.type-xl-600': {
          fontSize: '1.25rem', //20px
          fontWeight: '600',
          lineHeight: 1.4
        },
        '.type-xl-700': {
          fontSize: '1.25rem', //20px
          fontWeight: '700',
          lineHeight: 1.4
        },
        '.type-xl-800': {
          fontSize: '1.25rem', //20px
          fontWeight: '800',
          lineHeight: 1.4
        },
        '.type-large-300': {
          fontSize: '1.125rem', //18px
          fontWeight: '300',
          lineHeight: 1.56
        },
        '.type-large-400': {
          fontSize: '1.125rem', //18px
          fontWeight: '400',
          lineHeight: 1.56
        },
        '.type-large-500': {
          fontSize: '1.125rem', //18px
          fontWeight: '500',
          lineHeight: 1.56
        },
        '.type-large-600': {
          fontSize: '1.125rem', //18px
          fontWeight: '600',
          lineHeight: 1.56
        },
        '.type-large-700': {
          fontSize: '1.125rem', //18px
          fontWeight: '700',
          lineHeight: 1.56
        },
        '.type-large-800': {
          fontSize: '1.125rem', //18px
          fontWeight: '800',
          lineHeight: 1.56
        },
        '.type-base-300': {
          fontSize: '1rem', //16px
          fontWeight: '300',
          lineHeight: 1.5
        },
        '.type-base-400': {
          fontSize: '1rem', //16px
          fontWeight: '400',
          lineHeight: 1.5
        },
        '.type-base-500': {
          fontSize: '1rem', //16px
          fontWeight: '500',
          lineHeight: 1.5
        },
        '.type-base-600': {
          fontSize: '1rem', //16px
          fontWeight: '400',
          lineHeight: 1.5
        },
        '.type-base-700': {
          fontSize: '1rem', //16px
          fontWeight: '700',
          lineHeight: 1.5
        },
        '.type-base-800': {
          fontSize: '1rem', //16px
          fontWeight: '800',
          lineHeight: 1.5
        },
        '.type-small-300': {
          fontSize: '0.875rem', //14px
          fontWeight: '300',
          lineHeight: 1.43
        },
        '.type-small-400': {
          fontSize: '0.875rem', //14px
          fontWeight: '400',
          lineHeight: 1.43
        },
        '.type-small-500': {
          fontSize: '0.875rem', //14px
          fontWeight: '500',
          lineHeight: 1.43
        },
        '.type-small-600': {
          fontSize: '0.875rem', //14px
          fontWeight: '600',
          lineHeight: 1.43
        },
        '.type-small-700': {
          fontSize: '0.875rem', //14px
          fontWeight: '700',
          lineHeight: 1.43
        },
        '.type-small-800': {
          fontSize: '0.875rem', //14px
          fontWeight: '800',
          lineHeight: 1.43
        },
        '.type-xs-300': {
          fontSize: '0.75rem', //12px
          fontWeight: '300',
          lineHeight: 1.33
        },
        '.type-xs-400': {
          fontSize: '0.75rem', //12px
          fontWeight: '400',
          lineHeight: 1.33
        },
        '.type-xs-500': {
          fontSize: '0.75rem', //12px
          fontWeight: '500',
          lineHeight: 1.33
        },
        '.type-xs-600': {
          fontSize: '0.75rem', //12px
          fontWeight: '600',
          lineHeight: 1.33
        },
        '.type-xs-700': {
          fontSize: '0.75rem', //12px
          fontWeight: '700',
          lineHeight: 1.33
        },
        '.type-xs-800': {
          fontSize: '0.75rem', //12px
          fontWeight: '800',
          lineHeight: 1.33
        }
      });
    })
  ]
};
