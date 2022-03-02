module.exports = {
  preset: 'react-native',
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-native-community|@react-navigation|react-native-gesture-handler|react-native-reanimated))',
  ],
  globals: {'babel-jest': {babelConfig: true}},
};
