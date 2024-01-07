import React from 'react';
import { Provider } from '@react-native-material/core';
import { StyleSheet } from 'react-native';
import TeleopLayout from './src/components/layouts/TeleopLayout';
import PrematchScreen from './src/components/screens/PrematchScreen';
import AutoScreen from './src/components/screens/AutoScreen';
import EndgameScreen from './src/components/screens/EndgameScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import robotStates from './src/util/robotStates';

const NavStack = createNativeStackNavigator();

function App() {
  return (
    <Provider style={styles.container}>
      {
        <NavigationContainer>
          <NavStack.Navigator initialRouteName="PrematchScreen">
            <NavStack.Screen
              name="PrematchScreen"
              component={PrematchScreen}
              options={{ headerShown: false }}
            />
            <NavStack.Screen
              name="TeleopLayout"
              component={TeleopLayout}
              options={{ headerShown: false }}
              initialParams={{ initialRobotState: robotStates.empty, isAuto: false }}
            />
            <NavStack.Screen
              name="AutoScreen"
              component={AutoScreen}
              options={{ headerShown: false }}
            />
            <NavStack.Screen
              name="EndgameScreen"
              component={EndgameScreen}
              options={{ headerShown: false }}
            />
          </NavStack.Navigator>
        </NavigationContainer>
      }
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
