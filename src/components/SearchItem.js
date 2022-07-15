import React from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';
import PropTypes from 'prop-types';

import Button from '../components/Button';
import Colors from '../constants/Color';

const SearchItem = ({ filter, pageId, title, snippet }) => {
  const handlePress = function () {
    return Linking.openURL(`https://en.wikipedia.org/?curid=${pageId}`);
  };

  return (
    <View style={styles.item} filter={filter}>
      <Button label={title} onPress={handlePress} labelStyle={styles.header} />
      <Text style={styles.article}>{`${snippet}`}</Text>
    </View>
  );
};

export default SearchItem;

SearchItem.propTypes = {
  filter: PropTypes.array,
  pageId: PropTypes.number,
  title: PropTypes.string,
  snippet: PropTypes.string,
};

const styles = StyleSheet.create({
  article: {
    flexDirection: 'column',
    fontSize: 16,
    marginBottom: 10,
    marginHorizontal: 25,
    marginTop: 12,
  },
  header: {
    color: Colors.primary,
    flexDirection: 'column',
    fontSize: 20,
    fontWeight: '700',
    marginHorizontal: 25,
    textDecorationLine: 'underline',
  },
  item: {
    alignItems: 'flex-start',
    backgroundColor: Colors.secondary,
  },
});
