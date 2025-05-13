/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'essalud': {
          blue: '#006BB6',
          hoverBlue: '#005A99',
          light: '#FFF',
          darkblue: '#004D7F',
          orange: '#ffbc0e'
        }
      },
      fontFamily: {
        omnes: ['Omnes Medium', 'sans-serif']
      }
    }
  },
  plugins: [],
};