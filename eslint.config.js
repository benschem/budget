/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import { FlatCompat } from '@eslint/eslintrc';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';
import typescriptParser from '@typescript-eslint/parser';

const compat = new FlatCompat({
  baseDirectory: process.cwd(),
});

export default [
  ...compat.extends('airbnb'),

  {
    files: ['src/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      // Flat config does not allow `env`, so declare globals manually
      globals: {
        document: 'readonly',
        window: 'readonly',
        navigator: 'readonly',
        Node: 'readonly',
        Blob: 'readonly',
        FormData: 'readonly',
        Request: 'readonly',
        Response: 'readonly',
        fetch: 'readonly',
        Headers: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
      'jsx-a11y': jsxA11yPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // React 17+ JSX rules
      'react/react-in-jsx-scope': 'off', // Suppress 'React must be in scope errors when using React 17+
      'react/jsx-uses-react': 'off', // Suppress 'React must be in scope errors when using React 17+

      // Prettier integration
      'prettier/prettier': 'error', // Formatting issues become ESLint errors

      // Allow JSX in .tsx and .jsx files
      'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],

      // Typescript fixes
      'import/no-unresolved': 'off', // workaround for TS paths
      'import/extensions': 'off', // let TS handle extensions
      'no-console': 'off', // Allow console.log etc

      // Custom rules:
      'react/jsx-one-expression-per-line': 'off',
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    ignores: ['node_modules', 'dist'],
  },
];
