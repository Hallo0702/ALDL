module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        sm: '576px',
        md: '768px',
        lg: '1024px',
      },
      fontFamily: {
        custom: ['Custom'],
      },
      colors: {
        wpeach: '#FFEFEB',
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
        256: '64rem',
      },
      spacing: {
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
