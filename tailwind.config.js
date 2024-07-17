/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        tada: 'tada 1s ease-in-out 0.25s infinite',
      },
      screens: {
        tablet: '640px',
        laptop: '1100px',
        desktop: '1280px',
      },
      keyframes: {
        tada: {
          '0%': {
            transform: 'scale3d(1, 1, 1)',
          },
          '10%, 20%': {
            transform: 'scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)',
          },
          '30%, 50%, 70%, 90%': {
            transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)',
          },
          '40%, 60%, 80%': {
            transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)',
          },
          '100%': {
            transform: 'scale3d(1, 1, 1)',
          },
        },
      },
      colors: {
        black: '#151718',
        redColor: 'red',
        customGreen: 'rgb(60, 179, 113)',
      },
      gridTemplateColumns: {
        "1fr2fr1fr":"1fr 2fr 1fr"
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
