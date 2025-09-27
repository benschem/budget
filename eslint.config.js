module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'import', 'jsx-a11y', 'prettier'],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
  rules: {
    // React 17+ JSX rules
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',

    // Prettier integration
    'prettier/prettier': 'error',

    // Allow JSX in .tsx and .jsx files
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],

    // TS and import fixes
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'no-console': 'off',

    // Custom rules
    'react/jsx-one-expression-per-line': 'off',
  },
  ignorePatterns: ['node_modules', 'dist'],
};
