/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#0B0F19",
        electric: "#7C5CFF",
        aurora: "#2DD4BF"
      },
      boxShadow: {
        glow: "0 0 40px rgba(124, 92, 255, 0.4)"
      }
    }
  },
  plugins: []
};
