import React from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  Text,
  Linking,
  StyleSheet,
} from 'react-native';

export default function Results({route}) {
  const DATA = route.params.data;

  return (
    <FlatList
      testID="list"
      data={DATA}
      keyExtractor={item => item.pageid.toString()}
      renderItem={({item}) => (
        <View style={styles.list}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(`https://en.wikipedia.org/?curid=${item.pageid}`)
            }>
            <Text style={styles.header}>{`${item.title}`}</Text>
          </TouchableOpacity>
          <Text style={styles.article}>{`${item.snippet}`}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  article: {
    flexDirection: 'column',
    marginTop: '3%',
    marginBottom: '2%',
    marginHorizontal: '6%',
    fontSize: 15,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'column',
    fontSize: 21,
    color: 'midnightblue',
    fontWeight: 'bold',
    marginHorizontal: '6%',
    textDecorationLine: 'underline',
  },
  list: {
    backgroundColor: 'azure',
    alignItems: 'flex-start',
  },
});
