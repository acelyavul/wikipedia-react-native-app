import React from 'react';
import { RecoilRoot } from 'recoil';

import SearchContextProvider from './store/search-context';
import SearchBar from './components/SearchBar.js';

const App = () => {
  return (
    <RecoilRoot>
      <SearchContextProvider>
        <SearchBar />
      </SearchContextProvider>
    </RecoilRoot>
  );
};

export default App;
