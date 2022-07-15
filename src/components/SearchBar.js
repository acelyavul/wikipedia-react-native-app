import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useRecoilState } from 'recoil';

import { searchTermState } from '../store/atoms';
import { SearchContext } from '../store/search-context';
import Button from './Button';
import Colors from '../constants/Color';
import SearchList from './SearchList';
import { Close } from '../assets/Icons';

export default function SearchBar() {
  const searchCtx = useContext(SearchContext);

  const [search, setSearch] = useRecoilState(searchTermState);

  const onSubmitEdit = function () {
    searchCtx.getResults(search, searchCtx.srOffset);
  };

  function closeButtonHandler() {
    setSearch('');
  }

  if (searchCtx.isSuccess) {
    return <SearchList />;
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>WikiSearch</Text>
      <View style={styles.inputContainer}>
        <TextInput
          testID="input"
          style={styles.input}
          value={search}
          placeholder="Type here..."
          placeholderTextColor={Colors.dark}
          onChangeText={text => setSearch(text)}
        />
        <Button
          buttonStyle={styles.closeButtonStyle}
          onPress={closeButtonHandler}>
          <Close
            size={22}
            color={Colors.primary}
            style={styles.closeIconStyle}
          />
        </Button>
      </View>
      <Button
        label="Search"
        disabled={!search ? true : false}
        onPress={onSubmitEdit}
        buttonStyle={!search ? styles.btnDisabled : styles.btn}
        labelStyle={styles.label}>
        {searchCtx.isLoading && (
          <ActivityIndicator
            animating
            size="large"
            color={Colors.secondary}
            style={styles.loaderStyle}
          />
        )}
      </Button>
      {searchCtx.isError && (
        <Text style={styles.errorText}>Something went wrong!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  btnDisabled: {
    alignItems: 'center',
    backgroundColor: Colors.disabled,
    borderRadius: 12,
    justifyContent: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  closeButtonStyle: {
    maxHeight: 50,
    position: 'absolute',
    right: 40,
    top: 1,
  },
  closeIconStyle: {
    margin: 15,
  },
  errorText: {
    color: Colors.red,
    fontSize: 18,
    marginVertical: 10,
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
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  label: {
    color: Colors.white,
    fontSize: 22,
  },
  loaderStyle: {
    paddingRight: 10,
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
