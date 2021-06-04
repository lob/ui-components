const plugin = require('tailwindcss/plugin');
var flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default;

module.exports = {
  purge: [
    './src/**/*.vue'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      md: '576px',
      lg: '768px',
      xl: '1024px'
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      black: '#324350',

      primary: {
        100: '#7cc6dd',
        300: '#0099d7',
        500: '#1876db',
        700: '#0c68c0',
        900: '#0154ac'
      },
      lemon: {
        100: '#fbf3dc',
        300: '#f6e2aa',
        500: '#ffda74',
        700: '#fbc150',
        900: '#ed9107'
      },
      turquoise: {
        100: '#E5F1F5,',
        300: '#BBDCEA',
        500: '#57A1B9',
        700: '#4890A8',
        900: '#1F667D'
      },
      flint: {
        100: '#E3F1FB',
        300: '#BFD6F2',
        500: '#7798C8',
        700: '#5279B4',
        900: '#355D97'
      },
      mint: {
        100: '#E2F7ED',
        300: '#A3E4C5',
        500: '#6CC399',
        700: '#5AAD85',
        900: '#3A7659'
      },
      coral: {
        100: '#F8E7E6',
        300: '#FFC3BF',
        500: '#FF9E98',
        700: '#DB807A',
        900: '#943832'
      },
      gray: {
        100: '#C5D6E6',
        300: '#5F83A5',
        500: '#416581',
        700: '#324350', // same as black
        900: '#27333C'
      },
      white: {
        DEFAULT: '#FFFFFF',
        100: '#F8F9FA',
        200: '#F7F9FA',
        300: '#EBF0F6'
      },
      success: '#4BBC85',
      warning: '#F5AE5B',
      error: '#F76E40',
      alert: '#FFE773',
      tertiary: {
        bluebird: '#84bfd7',
        sky: '#96CDF2',
        azure: '#70c0e0',
        plum: '#b29aec',
        seafoam: '#68CCBB',
        burlywood: '#EBB572',
        lime: '#b8de62',
        gold: '#f7d669',
        cornsilk: '#FFF6CB',
        clay: '#D99980',
        caramel: '#D79139',
        tortilla: '#CBAB7E',
        pink: '#FFCECE',
        taffy: '#f79fc3'
      }
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.25rem', { lineHeight: '1.75rem' }],
      xl: ['1.5rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.75rem', { lineHeight: '2rem' }],
      '3xl': ['2rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.5rem', { lineHeight: '2.5rem' }],
      '5xl': ['3.25rem', { lineHeight: '1' }]
    },
    fontFamily: {
      sans: ['Larsseit', 'sans-serif']
    },
    fill: (theme) => ({
      ...theme('colors')
    }),
    extend: {
      borderWidth: {
        3: '3px'
      }
    }
  },
  variants: {
    extend: {
      translate: ['group-hover'],
      textColor: ['important'],
      backgroundColor: ['important']
    }
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('important', ({ container }) => {
        container.walkRules((rule) => {
          rule.selector = `.\\!${rule.selector.slice(1)}`;
          rule.walkDecls((decl) => {
            decl.important = true;
          });
        });
      });
    }),
    ({ addUtilities, theme, variants }) => {
      const colors = flattenColorPalette(theme('borderColor'));
      delete colors.default;

      const colorMap = Object.keys(colors)
        .map((color) => ({
          [`.border-t-${color}`]: { borderTopColor: colors[color] },
          [`.border-r-${color}`]: { borderRightColor: colors[color] },
          [`.border-b-${color}`]: { borderBottomColor: colors[color] },
          [`.border-l-${color}`]: { borderLeftColor: colors[color] }
        }));
      const utilities = Object.assign({}, ...colorMap);

      addUtilities(utilities, variants('borderColor'));
    }
  ]
};
