import { type Config } from "prettier";

const config: Config = {
  endOfLine: "auto",
  plugins: ["prettier-plugin-packagejson", "prettier-plugin-tailwindcss"],
};

export default config;
