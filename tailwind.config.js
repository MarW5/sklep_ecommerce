/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/pages/**/*.{ts,tsx}",
      "./src/components/**/*.{ts,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/forms'),
    ],
  }