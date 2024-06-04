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
        "black-75%": "rgba(0, 0, 0, 0.75)",
        "black-50%": "rgba(0, 0, 0, 0.50)",
        "black-25%": "rgba(0, 0, 0, 0.25)",
        white: "#ffffff",
        "white-75%": "rgba(255, 255, 255, 0.75)",
        "white-50%": "rgba(255, 255, 255, 0.50)",
        "white-25%": "rgba(255, 255, 255, 0.25)",
        "white-10%": "rgba(255, 255, 255, 0.25)",
        "gray-0": "#555555",
        "gray-1": "#A6A6A6",
        "gray-2": "#BFBFBF",
        "gray-3": "#DDDDDD",
        "gray-4": "#EBEBEB",
        "gray-5": "#F2F2F2",
        "blue-0": "#222F44",
        "blue-0-80%": "rgba(34, 47, 68, 0.80)",
        "blue-0-25%": "rgba(34, 47, 68, 0.25)",
        "blue-1": "#4E5969",
        "blue-2": "#E9EAEC",
        "blue-3": "#EEEFF1",
        "blue-4": "#F2F3F4",
        "blue-5": "#F8F8F9",
        alert: "#7F2222",
        success: "#227F52",
        "red-0": "#BF3333",
        "red-1": "#F8EAEA",
        "green-0": "#CDF4E1",
        "green-1": "#F5FDF9"
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
