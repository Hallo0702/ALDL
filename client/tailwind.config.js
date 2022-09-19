module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        custom: ['Custom'],
      },
      colors: {
        peach: '#FBD4CB',
        red: '#FF0000',
        black: '#000000',
        gray: '#D9D9D9',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
