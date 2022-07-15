import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { enableMocks, enableFetchMocks } from 'jest-fetch-mock';
import fetchMock from 'jest-fetch-mock';
import SearchBar from '../src/components/SearchBar';

enableFetchMocks();
enableMocks();

describe('SearchBar', () => {
  it('should render default elements', () => {
    const component = render(<SearchBar />);

    expect(component.getByText('WikiSearch')).toBeDefined();
    expect(component.getByPlaceholderText('Type here...')).toBeDefined();
    expect(component.getByText('Search')).toBeDefined();
  });

  it('should allow searching by input', () => {
    const { getByPlaceholderText } = render(<SearchBar />);

    fireEvent.changeText(getByPlaceholderText('Type here...'), 'javascript');
    expect(getByPlaceholderText('Type here...').props.value).toBe('javascript');
  });

  it.skip('should render results for Ertan search and navigate to the Results page', async () => {
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

    const navigation = { navigate: jest.fn() };
    const screen = render(<SearchBar navigation={navigation} />);

    fireEvent.changeText(screen.getByPlaceholderText('Type here...'), 'ertan');
    fireEvent.press(screen.getByText('Search'));

    expect(screen.queryAllByText('The heart that God gives us')).toBeDefined();
    expect(fetch).toHaveBeenCalledWith(
      'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srlimit=20&srsearch=ertan&sroffset=0',
    );
  });
});
