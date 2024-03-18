import animations from '@midudev/tailwind-animations'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Onest Variable', 'sans-serif'],
      },
      colors: {
        'cod-gray': {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
          950: '#121212',
        },
        carissma: {
          50: '#fdf2f6',
          100: '#fce7f0',
          200: '#fbcfe1',
          300: '#f9a8c8',
          400: '#f68ab2',
          500: '#ec4880',
          600: '#db275c',
          700: '#be1844',
          800: '#9d1739',
          900: '#831833',
          950: '#500719', // rose
        },
      },
    },
  },
  plugins: [animations],
}
