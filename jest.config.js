module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js)$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
    '\\.(ts|ts)x?$': 'ts-jest',
  },
  setupFiles: ['./src/setupTests'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx|js|ts)?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^src/(.*)': '<rootDir>/src/$1',
    '^assets/(.*)': '<rootDir>/assets/$1',
  },
};
