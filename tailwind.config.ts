import "dotenv/config";
import { exit } from "node:process";
import type { Config } from "tailwindcss";

const getEnv = ({
  env,
  from = ".env",
  field = env,
}: {
  env: string;
  from?: string;
  field?: string;
}) => {
  const ENV = process.env[env];
  if (!ENV) {
    console.error(`No \`${field}\` field found in \`${from}\`, exit`);
    exit(1);
  } else {
    return ENV;
  }
};

const config = {
  important: "#root",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: getEnv({ env: "VITE_THEME_COLOR_PRIMARY" }),
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
