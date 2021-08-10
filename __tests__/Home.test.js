import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {enableMocks, enableFetchMocks} from 'jest-fetch-mock';
import fetchMock from 'jest-fetch-mock';
import Home from '../src/screens/Home';

enableFetchMocks();
enableMocks();

it('should render Home properly', () => {
  render(<Home />);
});

it('should render default elements', () => {
  const {getByText, getByPlaceholderText} = render(<Home />);
  expect(getByText('WikiSearch')).toBeDefined();
  getByPlaceholderText('Type here...');
  getByText('Search');
});

it('should allow change input element', () => {
  const {getByTestId} = render(<Home />);

  const input = getByTestId('input');
  fireEvent.changeText(input, 'ataturk');
  expect(input).toBeDefined();
});

it('should allow searching by input', () => {
  const navigation = {navigate: jest.fn()};
  const {getByTestId, queryAllByText, getByText} = render(
    <Home navigation={navigation} />,
  );

  const input = getByTestId('input');
  const button = getByText('Search');
  fireEvent.changeText(input, 'ataturk');
  fireEvent.press(button);
  const data = queryAllByText('ataturk');
  expect(data).toBeDefined();
});

const closeDatabase = () => setTimeout(() => process.exit(), 1000);

describe('Checking Data', () => {
  afterEach(() => closeDatabase());

  it('should render results for Ertan search and navigate to the Results page', () => {
    fetchMock.mockIf(
      'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srlimit=1&srsearch=ertan?origin=*',
      () => {
        return {
          // eslint-disable-next-line quotes
          body: `{"batchcomplete":"","continue":{"sroffset":1,"continue":"-||"},"query":{"searchinfo":{"totalhits":43},"search":[{"ns":0,"title":"Ertan Saban","pageid":52180951,"size":2767,"wordcount":213,"snippet":"ethnic <span class=\"searchmatch\">origin</span>.)&quot;<span class=\"searchmatch\">Ertan</span> Saban: Allah'\u0131n verdi\u011fi kalp her zaman dolu olmal\u0131(The heart that God gives us must always be full)&quot;. &quot;<span class=\"searchmatch\">Ertan</span> Saban Kimdir?&quot;. &quot;<span class=\"searchmatch\">Ertan</span> Saban&quot;","timestamp":"2021-04-28T12:54:37Z"}]}}`,
          headers: {
            'content-type': 'application/json; charset=utf-8',
          },
        };
      },
    );
    const navigation = {navigate: jest.fn()};
    const {getByTestId, queryAllByText, getByText} = render(
      <Home navigation={navigation} />,
    );
    const input = getByTestId('input');
    const button = getByText('Search');
    fireEvent.changeText(input, 'Ertan');
    fireEvent.press(button);
    const data = queryAllByText(
      'The heart that God gives us must always be full',
    );
    const spy = jest.spyOn(navigation, 'navigate');
    expect(spy).toHaveBeenCalledWith('Results', {data: data});
  });
});
