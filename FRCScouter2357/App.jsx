import React, { useEffect } from 'react';
import { Provider } from '@react-native-material/core';
import { StyleSheet } from 'react-native';
import TeleopLayout from './components/layouts/TeleopLayout';
import PrematchScreen from './components/screens/PrematchScreen';
import AutoScreen from './components/screens/AutoScreen';
import EndgameScreen from './components/screens/EndgameScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { cleanup, init } from './state/bluetoothSlice';
import AwaitAssignmentScreen from './components/screens/AwaitAssignmentScreen';

const NavStack = createNativeStackNavigator();

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(init());

    return () => {
      dispatch(cleanup());
    };
  }, []);

  if (!useSelector((state) => state.bluetooth.isInit)) {
    return <AwaitAssignmentScreen />;
  }

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
