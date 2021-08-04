import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screens/Home.js';
import Results from './src/screens/Results';
import Theme from './src/Theme';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer theme={Theme}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{gestureEnabled: false}}>
        <Stack.Screen
          header={{backgroundColor: 'midnightblue'}}
          name="Home"
          component={Home}
          options={{title: null}}
        />
        <Stack.Screen
          name="Results"
          component={Results}
          options={{title: 'Results'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
