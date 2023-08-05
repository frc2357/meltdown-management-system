import React from 'react';
import { Provider, Stack } from '@react-native-material/core';
import { StyleSheet } from 'react-native';
import teleopLayout from './components/layouts/teleopLayout';
import prematchScreen from './components/screens/prematchScreen';
import autoScreen from './components/screens/autoScreen';
import endgameScreen from './components/screens/endgameScreen';
import { NavigationContainer, createNativeStackNavigator } from '@react-navigation/native';

const NavStack = createNativeStackNavigator();

function App() {
  return (
    <Provider style={styles.container}>
      {/* <NavigationContainer>
        <NavStack.Navigator initialRouteName="teleop">
          <Stack.screen name="teleop" component={teleopLayout} />
          <Stack.screen name="prematch" component={prematchScreen} />
          <Stack.screen name="autoScreen" component={autoScreen} />
          <Stack.screen name="endgameScreen" component={endgameScreen} />
        </NavStack.Navigator>
      </NavigationContainer> */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'flex-start',
  },
});

export default App;
