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
    },
  },
  plugins: [animations],
}
