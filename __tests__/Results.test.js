import React from 'react';
import {render} from '@testing-library/react-native';
import Results from '../src/screens/Results';

it('should render Results properly', () => {
  const params = {params: jest.fn()};
  render(<Results route={params} />);
});

it('should render default elements', () => {
  const params = {params: jest.fn()};
  const {getByTestId} = render(<Results route={params} />);
  expect(getByTestId('list')).toBeDefined();
});
