/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{html,js}",
  ],
  theme: {
    fontSize:{
      'mb': ['0.5vh'],
    },
    dropShadow:{
      'menuShadow': '0 0px 15px rgba(0,0,0,0.6)',
    }
  },
    extend: {
  },
  plugins: [],
}

//  npx tailwindcss -i ./src/style.css -o ./style.css --watch

