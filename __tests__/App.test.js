import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';

jest.mock('../__mocks__/react-native-reanimated.js');
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

it('should render App properly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
