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
      height: {
        'blog-post': '50rem',
        '40-screen': '40vh',
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
