import 'react-native-gesture-handler/jestSetup';
import {jest} from '@jest/globals';

require('jest-fetch-mock').enableMocks();

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.useFakeTimers();
