import React from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  Text,
  Linking,
  StyleSheet,
} from 'react-native';
import Colors from '../constants/Color';

export default function Results({route}) {
  const DATA = route.params.data;

  return (
    <FlatList
      testID="list"
      data={DATA}
      keyExtractor={item => item.pageid.toString()}
      renderItem={({item}) => {
        const filter = DATA.map(i => {
          i.snippet = i.snippet
            .replace(/<span class="searchmatch">(.*?)<\/span>/g, '$1')
            .replace(/&quot;(.*?)&quot;/g, '$1')
            .replace('&quot;', '')
            .replace('&amp;', '');
        });
        return (
          <View style={styles.item} filter={filter}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  `https://en.wikipedia.org/?curid=${item.pageid}`,
                )
              }
            >
              <Text style={styles.header}>{`${item.title}`}</Text>
            </TouchableOpacity>
            <Text style={styles.article}>{`${item.snippet}`}</Text>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  article: {
    flexDirection: 'column',
    fontSize: 16,
    fontWeight: '600',
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
