import React from 'react';
import { render } from '@testing-library/react-native';
import App from '.././src/App';

jest.mock('../__mocks__/react-native-reanimated.js');
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

it('should render App properly', () => {
  const screen = render(<App />);
  expect(screen.getByText('WikiSearch')).toBeDefined();
});
