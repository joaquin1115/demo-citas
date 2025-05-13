/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'essalud': {
          blue: '#0075C9',
          light: '#41B6E6',
          darkblue: '#004D7F'
        }
      },
      fontFamily: {
        omnes: ['Omnes Medium', 'sans-serif']
      }
    }
  },
  plugins: [],
};