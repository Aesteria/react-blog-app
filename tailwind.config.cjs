/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{tsx,ts}'],
  theme: {
    extend: {
      flex: {
        4: '4 1 0%',
        3: '3 1 0%',
        2: '2 1 0%',
      },
      minHeight: {
        27: '27rem',
        13: '13rem',
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
      transitionProperty: {
        backgroundColor: 'background-color',
      },
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
