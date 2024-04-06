import { exit } from "node:process";

import { type Config } from "tailwindcss";

if (!process.env.VITE_THEME_COLOR_PRIMARY) {
  console.error("No `VITE_THEME_COLOR_PRIMARY` field found in `.env`, exit");
  exit(1);
}

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
} satisfies Config;
