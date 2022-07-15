const { defaults } = require('jest-config');

module.exports = {
  verbose: true,
  testTimeout: 20000,
  globals: {
    'babel-jest': {
      babelConfig: true,
    },
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-reanimated)/)',
  ],
  moduleFileExtensions: [...defaults.moduleFileExtensions],
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transform: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/fileTransformer.js',
  },
};
