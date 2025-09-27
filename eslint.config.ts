import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    languageOptions: {
      globals: globals.browser,
    },
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
]);
