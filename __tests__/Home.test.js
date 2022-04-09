import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {enableMocks, enableFetchMocks} from 'jest-fetch-mock';
import fetchMock from 'jest-fetch-mock';
import Home from '../src/screens/Home';

enableFetchMocks();
enableMocks();

describe('Home screen', () => {
  beforeEach(() => {
    jest.useFakeTimers('legacy');
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render default elements', () => {
    const {getByText, getByPlaceholderText} = render(<Home />);
    expect(getByText('WikiSearch')).toBeDefined();
    getByPlaceholderText('Type here...');
    getByText('Search');
  });

  it('should allow searching by input', () => {
    const {getByPlaceholderText} = render(<Home />);

    fireEvent.changeText(getByPlaceholderText('Type here...'), 'acelya');
    expect(getByPlaceholderText('Type here...').props.value).toBe('acelya');
  });

  it('should render results for Ertan search and navigate to the Results page', async () => {
    fetchMock.mockIf(
      'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srlimit=1&srsearch=ertan?origin=*',
      () => {
        return {
          body: `{"batchcomplete":"","continue":{"sroffset":1,"continue":"-||"},"query":{"searchinfo":{"totalhits":43},"search":[{"ns":0,"title":"Ertan Saban","pageid":52180951,"size":2767,"wordcount":213,"snippet":"ethnic <span class="searchmatch">origin</span>.)&quot;<span class="searchmatch">Ertan</span> Saban: Allah'\u0131n verdi\u011fi kalp her zaman dolu olmal\u0131(The heart that God gives us must always be full)&quot;. &quot;<span class="searchmatch">Ertan</span> Saban Kimdir?&quot;. &quot;<span class="searchmatch">Ertan</span> Saban&quot;","timestamp":"2021-04-28T12:54:37Z"}]}}`,
          headers: {
            'content-type': 'application/json; charset=utf-8',
          },
        };
      },
    );

    const {getByPlaceholderText, getByText, queryAllByText} = render(<Home />);

    fireEvent.changeText(getByPlaceholderText('Type here...'), 'ertan');
    fireEvent.press(getByText('Search'));

    expect(queryAllByText('The heart that God gives us')).toBeDefined();
    expect(fetch).toHaveBeenCalledWith(
      'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srlimit=20&srsearch=ertan',
    );
  });

  it('should display alert message when failed to load data', async () => {
    jest.spyOn(window, 'fetch');
    window.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () =>
        new Error('Failed to load... Please check your network connection!'),
    });

    const screen = render(<Home />);
    fireEvent.changeText(
      screen.getByPlaceholderText('Type here...'),
      'javascript',
    );
    fireEvent.press(screen.getByText('Search'));

    await waitFor(() =>
      expect(
        screen.queryByText(
          'Failed to load... Please check your network connection!',
        ),
      ).toBeDefined(),
    );

    expect(window.fetch).toHaveBeenCalledTimes(1);
    window.fetch.mockRestore();
  });
});
