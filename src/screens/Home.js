import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';

export default function Home({navigation}) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const URL = `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srlimit=10&srsearch=${search}`;

  useEffect(() => {
    const fetchResults = async () => {
      if (search === '') {
        return;
      }
      try {
        const response = await fetch(URL, {method: 'get'});
        const json = await response.json();
        setData(json.query.search);
      } catch (err) {
        Alert.alert('Failed to load... Please check your network connection!');
      }
    };
    fetchResults();
  }, [URL, search]);

  const onSubmitEdit = () => {
    if (!search) {
      Alert.alert('No Results Found!');
      return;
    }
    navigation.navigate('Results', {
      data: data,
    });
  };

  return (
    <View style={styles.pageContainer}>
      <Text style={styles.pageName}>WikiSearch</Text>
      <TextInput
        testID="input"
        style={styles.input}
        value={search}
        placeholder="Type here..."
        placeholderTextColor="midnightblue"
        onChangeText={text => setSearch(text)}
      />
      <TouchableOpacity style={styles.btn} data={data} onPress={onSubmitEdit}>
        <Text style={styles.label} adjustsFontSizeToFit>
          Search
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: '30%',
    marginTop: 15,
    alignItems: 'center',
    backgroundColor: 'midnightblue',
    borderWidth: 3,
    borderColor: 'midnightblue',
    borderRadius: 12,
    padding: 5,
  },
  input: {
    marginTop: 15,
    borderWidth: 3,
    borderColor: 'midnightblue',
    borderRadius: 12,
    width: '80%',
    fontSize: 20,
    paddingLeft: 20,
  },
  label: {
    justifyContent: 'center',
    color: 'white',
    fontSize: 24,
  },
  listContainer: {
    backgroundColor: 'azure',
    alignContent: 'center',
  },
  pageContainer: {
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    flexDirection: 'column',
    flex: 1,
  },
  pageName: {
    fontSize: 34,
    alignItems: 'center',
    fontWeight: 'bold',
    color: 'navy',
    marginTop: 50,
  },
});
