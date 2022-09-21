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
        gray: {
          light: '#D9D9D9',
          normal: '#AAAAAA',
          DEFAULT: '#AAAAAA',
          dark: '#797979',
        },
      },
      width: {
        112: '28rem',
        128: '32rem',
        256: '64rem',
      },
      height: {
        112: '28rem',
        128: '32rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
