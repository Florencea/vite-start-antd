import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import { reactRefresh } from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["dist", "src/routeTree.gen.ts", ".tanstack", ".vitest"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Allow TanStack Router redirect throws
      "@typescript-eslint/only-throw-error": [
        "error",
        {
          allow: ["Redirect"],
        },
      ],
      // Allow async functions in JSX event handlers
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
      // Allow both type aliases and interfaces
      "@typescript-eslint/consistent-type-definitions": "off",
      // Ban @ts-ignore and require description for @ts-expect-error
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-ignore": true,
          "ts-expect-error": "allow-with-description",
          "ts-nocheck": true,
          "ts-check": false,
          minimumDescriptionLength: 5,
        },
      ],
    },
  },
  {
    files: ["src/**/*.{ts,tsx}", "test/**/*.{ts,tsx}"],
    extends: [
      reactHooks.configs.flat["recommended-latest"],
      reactRefresh.configs.vite({
        extraHOCs: ["createFileRoute", "createRootRoute"],
      }),
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ["scripts/**/*.{ts,tsx}", "*.config.ts"],
    languageOptions: {
      globals: globals.node,
    },
  },
]);
