import "dotenv/config";

/** @type {import('tailwindcss').Config} */
export default {
  important: "#root",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: process.env.VITE_THEME_COLOR_PRIMARY,
      },
    },
  },
  plugins: [],
};
