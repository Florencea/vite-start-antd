/**
 * reference from: https://github.com/JoshuaKGoldberg/linting-typescript-in-2023/blob/main/.eslintrc.cjs
 */

/* eslint-env commonjs, node */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:typescript-sort-keys/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  globals: {
    process: true,
  },
  overrides: [
    {
      files: ["**/*.{ts,tsx}"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json", "./tsconfig.node.json"],
      },
    },
    {
      files: "*.json",
      excludedFiles: "package-lock.json",
      parser: "jsonc-eslint-parser",
      rules: {
        "jsonc/sort-keys": "error",
      },
      extends: ["plugin:jsonc/recommended-with-json"],
    },
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "react-refresh",
    "simple-import-sort",
    "typescript-sort-keys",
  ],
  root: true,
  rules: {
    "react-refresh/only-export-components": "error",
    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
