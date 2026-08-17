/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#A21C1C",
          hover: "#D4AF37",
        },
        secondary: "#F5F7FA",
        darkText: "#111827",
        mutedText: "#6B7280",
        royalBlue: "#1D4ED8",
        gold: "#D4AF37",
        lightBlue: "#E8F1FA",
        border: "#E5E7EB"
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        'premium': "0 10px 30px -10px rgba(18, 59, 109, 0.08)",
        'premium-hover': "0 20px 40px -15px rgba(18, 59, 109, 0.15)",
        'luxury': "0 15px 35px -10px rgba(212, 175, 55, 0.12)",
      }
    },
  },
  plugins: [],
}
