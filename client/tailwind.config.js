
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.tsx',
    './src/App.tsx',
    './src/main.tsx'
    ],
  theme: {
    extend: {
      colors: {
        'gray-light': '#e5e7eb'
      }
    },
  },
  plugins: [],
}

