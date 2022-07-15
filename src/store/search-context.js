import React, { createContext, useReducer, useCallback } from 'react';
import Proptypes from 'prop-types';

const initialState = {
  data: [],
  error: '',
  loading: false,
  srOffset: 0,
  success: false,
};

function searchReducer(state, action) {
  switch (action.type) {
    case 'IDLE': {
      return {
        ...state,
        data: [],
        error: '',
        loading: false,
        srOffset: initialState.srOffset,
        success: false,
      };
    }
    case 'PENDING': {
      return {
        ...state,
        loading: true,
      };
    }
    case 'REJECTED': {
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false,
      };
    }
    case 'RESOLVED': {
      return {
        ...state,
        data: action.data,
        error: '',
        loading: false,
        success: true,
        srOffset: action.srOffset,
      };
    }
    case 'REFRESH': {
      return {
        ...state,
        loading: false,
        success: true,
        error: '',
        data: action.data,
        srOffset: initialState.srOffset,
      };
    }
    default: {
      throw new Error(`Unknown action type: ${action.type}`);
    }
  }
}

export const SearchContext = createContext({
  srOffset: initialState.srOffset,
  data: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  getResults: () => {},
});

export const SEARCH_LIMIT = 20;

function SearchContextProvider({ children }) {
  const [searchState, dispatchSearchAction] = useReducer(
    searchReducer,
    initialState,
  );

  const getResults = useCallback(
    async function (searchTerm, srOffset) {
      try {
        dispatchSearchAction({ type: 'PENDING' });

        const response = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srlimit=${SEARCH_LIMIT}&srsearch=${searchTerm}&sroffset=${srOffset}`,
        );

        if (!response.ok) {
          throw new Error(response.status);
        }

        const json = await response.json();

        let searchResults =
          searchState.srOffset === 0
            ? json.query.search
            : [...searchState.data, ...json.query.search];

        dispatchSearchAction({
          type: 'RESOLVED',
          srOffset: json.continue.sroffset,
          data: searchResults,
        });
      } catch (error) {
        dispatchSearchAction({ type: 'REJECTED', error });
      }
    },
    [searchState.data, searchState.srOffset, dispatchSearchAction],
  );

  const memoizedValue = React.useMemo(
    () => ({
      srOffset: searchState.srOffset,
      data: searchState.data,
      isLoading: searchState.loading,
      isSuccess: searchState.success,
      isError: searchState.error,
      dispatchSearchAction,
      getResults,
    }),
    [searchState, dispatchSearchAction, getResults],
  );

  return (
    <SearchContext.Provider value={memoizedValue}>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContextProvider;

SearchContextProvider.propTypes = {
  children: Proptypes.any,
};
