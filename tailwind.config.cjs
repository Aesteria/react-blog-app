/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{tsx,ts}'],
  theme: {
    extend: {
      flex: {
        4: '4 1 0%',
        3: '3 1 0%',
      },
      height: {
        42: '42rem',
      },
      width: {
        25: '25rem',
      },
      backgroundColor: {
        darkGray: '#303030',
      },
    },
    fontFamily: {
      sans: ['Inter var', 'sans-serif'],
    },
  },
  plugins: [],
};
