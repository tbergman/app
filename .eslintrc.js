const OFF = 'off';
const ERROR = 'error';
const WARN = 'warn';

module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    jest: true,
    node: true,
  },
  plugins: ['react', 'react-native', 'react-native-a11y'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:react-native/all',
    'plugin:react-native-a11y/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2016,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-undef': ERROR,
    'no-unused-vars': WARN,
    'react/prop-types': OFF,
    'react/display-name': OFF,
    'no-debugger': OFF,
    'react-native/no-color-literals': OFF, // TODO Reenable this
    'react-native/split-platform-components': OFF, // TODO maybe reenable this?
  },
  globals: {
    __DEV__: false,
    Promise: false,
  },
};
