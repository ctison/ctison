module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:solid/typescript',
    'plugin:jsx-a11y/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'solid', 'jsx-a11y'],
  rules: {
    '@typescript-eslint/no-empty-interface': 'off',
  },
  ignorePatterns: ['.eslintrc.cjs'],
}
