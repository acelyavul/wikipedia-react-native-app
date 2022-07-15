import React, { useState, useCallback, useContext } from 'react';
import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';

import { searchTermState } from '../store/atoms';
import { SearchContext } from '../store/search-context';
import { filterData } from '../utils/helpers';
import Button from './Button';
import { ChevronLeft } from '../assets/Icons';
import SeachItem from './SearchItem';
import Colors from '../constants/Color';
import * as Utils from '../utils/helpers';

export default function SearchList() {
  const searchTerm = useRecoilValue(searchTermState);
  const searchCtx = useContext(SearchContext);

  const [refreshing, setRefreshing] = useState(false);
  const [scrollBegin, setScrollBegin] = useState(false);

  const filter = filterData(searchCtx.data);

  function footerIndicatorHandle() {
    return (
      <ActivityIndicator
        animating
        size="large"
        color={Colors.primary}
        style={styles.loaderStyle}
      />
    );
  }

  async function loadMore() {
    await searchCtx.getResults(searchTerm, searchCtx.srOffset);
  }

  const refreshControlHandler = useCallback(async () => {
    setRefreshing(true);
    await searchCtx.getResults(searchTerm, 0);
    setRefreshing(false);
  }, [searchTerm, searchCtx]);

  function handleNavigateBack() {
    searchCtx.dispatchSearchAction({ type: 'IDLE' });
  }

  return (
    <>
      <Button
        label={`Wiki > ${Utils.capitalizeStr(searchTerm)}`}
        buttonStyle={styles.button}
        labelStyle={styles.label}
        onPress={handleNavigateBack}>
        <ChevronLeft size={22} color={Colors.white} style={styles.icon} />
      </Button>

      <FlatList
        testID="list"
        style={styles.list}
        data={searchCtx.data}
        keyExtractor={item => `${item.pageid}${Utils.generateId()}`}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshControlHandler}
          />
        }
        onMomentumScrollBegin={() => setScrollBegin(true)}
        onMomentumScrollEnd={() => setScrollBegin(false)}
        onEndReached={({ distanceFromEnd }) => {
          if (distanceFromEnd < 0) return;
          scrollBegin && loadMore();
        }}
        ListFooterComponent={footerIndicatorHandle}
        ListFooterComponentStyle={{ backgroundColor: Colors.secondary }}
        renderItem={({ item }) => {
          return (
            <SeachItem
              filter={filter}
              pageId={item.pageid}
              title={item.title}
              snippet={item.snippet}
            />
          );
        }}
      />
    </>
  );
}

SearchList.propTypes = {
  setNavigate: PropTypes.func,
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: Colors.secondary,
    fontSize: 22,
    paddingLeft: 10,
  },
  list: {
    flex: 1,
    paddingTop: 10,
  },
  loaderStyle: {
    paddingVertical: 20,
  },
});
