import React from 'react';
import {render} from '@testing-library/react-native';
import Results from '../src/screens/Results';

describe('Results screen', () => {
  const mockResult = 'JS, is a programming language';

  it('should render default elements', () => {
    const params = {params: mockResult};
    const screen = render(<Results route={params} />);
    expect(screen.getByTestId('list')).toBeDefined();
  });
});
