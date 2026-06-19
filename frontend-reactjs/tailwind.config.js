/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#111111", // đen
        secondary: "#C9A96E", // gold
        accent: "#E5D3B3", // beige

        bg: "#FAFAFA",
        card: "#FFFFFF",
        border: "#EAEAEA",

        text: "#1A1A1A",
        "text-light": "#666",
      },

      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
        luxury: ['"Playfair Display"', "serif"],
      },

      animation: {
        fadeIn: "fadeIn 0.4s ease",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
