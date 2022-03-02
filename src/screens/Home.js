import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import Colors from '../constants/Color';

export default function Home(props) {
  const [search, setSearch] = useState('');
  const URL = `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srlimit=20&srsearch=${search}`;

  const onSubmitEdit = async () => {
    if (!search) {
      Alert.alert('No Results Found!');
      return;
    }

    try {
      const response = await fetch(URL);

      if (response.ok) {
        const json = await response.json();
        setSearch('');
        return props.navigation.navigate('Results', {
          result: json.query.search,
        });
      }
      throw response;
    } catch (err) {
      console.log(err);
      Alert.alert('Failed to load... Please check your network connection!');
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>WikiSearch</Text>
      <TextInput
        testID="input"
        style={styles.input}
        value={search}
        placeholder="Type here..."
        placeholderTextColor={Colors.dark}
        onChangeText={text => setSearch(text)}
      />
      <TouchableOpacity style={styles.btn} onPress={onSubmitEdit}>
        <Text style={styles.label}>Search</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    padding: 5,
    width: '30%',
  },
  input: {
    borderColor: Colors.primary,
    borderRadius: 12,
    borderWidth: 3,
    fontSize: 20,
    marginBottom: 15,
    paddingLeft: 20,
    width: '80%',
  },
  label: {
    color: Colors.white,
    fontSize: 22,
  },
  screen: {
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  title: {
    alignItems: 'center',
    color: Colors.primary,
    fontSize: 34,
    fontWeight: 'bold',
    marginVertical: 40,
  },
});
