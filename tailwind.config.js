/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'essalud': {
          blue: '#0075C9', // PANTONE 3005C
          light: '#41B6E6' // PANTONE 298C
        }
      },
      fontFamily: {
        tahoma: ['Tahoma', 'sans-serif']
      }
    },
  },
  plugins: [],
};