/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'Nunito': ['Nunito Sans', 'sans-serif']
      },
      colors: {
        bgColor: '#fdfefe',
        HeaderBgColor: '#ffffff',
        textColor: '#333333',
        themeColor: '#0a36b0',
        borderColor: '#d1d5db',
        cardBgColorFrom: '#EAF1FC',
        cardBgColorto: '#F1F5F9',
        borderInputColor: '#767676'
      },
      width: {
        'custom': '330px'
      }
    },
  },
  plugins: [],
}

