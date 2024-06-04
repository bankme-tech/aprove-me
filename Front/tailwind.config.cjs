/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"]
      },
      animation: {
        "pulse-slow": "pulse 5s infinite"
      },
      fontSize: {
        xs: "0.6rem",
        sm: "0.75rem",
        base: "0.75rem",
        lg: "0.85rem",
        xl: "0.85rem",
        "2xl": "0.85rem",
        "3xl": "1rem",
        "4xl": "1.4rem",
        "5xl": "1.4rem",
        "6xl": "2rem",
        "7xl": "2.8rem"
      },
      fontWeight: {
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600"
      },
      colors: {
        "gold-0": "#D3A93D",
        "gold-1": "#E2BD7A",
        "gold-2": "#FAF2E5",
        black: "#151515",
        white: "#ffffff",
        "gray-0": "#555555",
        "gray-1": "#BFBFBF",
        "gray-2": "#DDDDDD",
        "gray-3": "#F2F2F2",
        "purple-0": "#56219A",
        "purple-1": "#BB6BD9",
        "purple-2": "#F3E7FF",
        "red-0": "#7F2222",
        "red-1": "#BF3333",
        "red-2": "#F8EAEA",
        "green-0": "#227F52",
        "green-1": "#CDF4E1",
        "green-2": "#F5FDF9"
      }
    },
    screens: {
      sm: { max: "1000px" },
      // => @media (max-width: 1000px) { ... }
      md: { min: "1000px", max: "1400px" },
      // => @media (min-width: 1000px, max-width: 1400px) { ... }
      lg: { min: "1400px", max: "2000px" },
      // => @media (min-width: 1400px, max-width: 2000px) { ... }
      xl: { min: "2000px" }
      // => @media (min-width: 2000px) { ... }
    }
  },
  plugins: []
};
