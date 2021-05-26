module.exports = {
  purge: [
    './src/**/*.vue'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '1024px'
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      black: '#324350',
      white: '#FFFFFF',
      offWhite: '#F8F9FA',

      primary: {
        xl: '#7cc6dd',
        l: '#0099d7',
        DEFAULT: '#1876db',
        d: '#0c68c0',
        xd: '#0154ac'
      },
      blue: {
        xl: '#7cc6dd',
        l: '#0099d7',
        DEFAULT: '#1876db',
        d: '#0c68c0',
        xd: '#0154ac'
      },
      yellow: { // was lemon
        xl: '#fbf3dc',
        l: '#f6e2aa',
        DEFAULT: '#ffda74',
        d: '#fbc150',
        xd: '#ed9107'
      },
      teal: { // was turquoise
        xl: '#BBDCEA',
        l: '#DBF0F9',
        DEFAULT: '#57A1B9',
        d: '#4890A8',
        xd: '#1F667D'
      },
      indigo: { // was flint
        xl: '#DCE7FC',
        l: '#BFD6F2',
        DEFAULT: '#7798C8',
        d: '#5279B4',
        xd: '#355D97'
      },
      green: { // was mint
        xl: '#E2F7ED',
        l: '#A3E4C5',
        DEFAULT: '#6CC399',
        d: '#5AAD85',
        xd: '#3A7659'
      },
      red: { // was coral
        xl: '#F8E7E6',
        l: '#FFC3BF',
        DEFAULT: '#FF9E98',
        d: '#DB807A',
        xd: '#943832'
      },
      gray: {
        xxl: '#EBF3F6',
        xl: '#EBF0F6',
        l: '#C5D6E6',
        DEFAULT: '#5F83A5',
        d: '#416581',
        xd: '#324350', // same as black
        xxd: '#27333C'
      },
      success: '#4BBC85',
      warning: '#F5AE5B',
      error: '#F76E40',
      alert: '#FFE773',
      cobalt: '#1876db',
      cerulean: '#0099d7',
      robinsegg: '#7CC6DD',
      shadow: '#27333c',
      midnight: '#324350',
      shadow50: '#416581',
      steel: '#5f83a5',
      dove: '#c5d6e6',
      fog: '#ebf0f6',
      mist: '#F7F9FA',
      turquoise: '#57A1B9',
      flint: '#7798c8',
      mint: '#6cc399',
      lime: '#b8de62',
      gold: '#f7d669',
      cornsilk: '#FFF6CB',
      burlywood: '#EBB572',
      caramel: '#D79139',
      tortilla: '#CBAB7E',
      clay: '#D99980',
      coral: '#FF9E98',
      pink: '#FFCECE',
      taffy: '#f79fc3',
      plum: '#b29aec',
      seafoam: '#68CCBB',
      azure: '#70c0e0',
      bluebird: '#84bfd7',
      sky: '#96CDF2'
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
    extend: {
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
