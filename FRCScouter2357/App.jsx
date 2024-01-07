import React from 'react';
import { Provider } from '@react-native-material/core';
import { StyleSheet } from 'react-native';
import TeleopLayout from './src/components/layouts/TeleopLayout';
import PrematchScreen from './src/components/screens/PrematchScreen';
import EndgameScreen from './src/components/screens/EndgameScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import robotStates from './src/util/robotStates';
import { AssignmentContext } from './src/contexts/AssignmentContext';
import { MatchContext } from './src/contexts/MatchContext';
import { Startup } from './src/components/screens/Startup';
import { QRCapture } from './src/components/screens/QRCapture';
import { QRShow } from './src/components/screens/QRShow';
import { MatchLogs } from './src/components/screens/MatchLogs';

const NavStack = createNativeStackNavigator();

function App() {
  return (
    <Provider style={styles.container}>
      <AssignmentContext.Provider value={{}}>
        <MatchContext.Provider value={{}}>
          <NavigationContainer>
            <NavStack.Navigator initialRouteName="Startup">
              <NavStack.Screen
                name="Startup"
                component={Startup}
                options={{ headerShown: false }}
              />
              <NavStack.Screen
                name="MatchLogs"
                component={MatchLogs}
                options={{ headerShown: false }}
              />
              <NavStack.Screen
                name="QRCapture"
                component={QRCapture}
                options={{ headerShown: false }}
              />
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
                name="EndgameScreen"
                component={EndgameScreen}
                options={{ headerShown: false }}
              />
              <NavStack.Screen name="QRShow" component={QRShow} options={{ headerShown: false }} />
            </NavStack.Navigator>
          </NavigationContainer>
        </MatchContext.Provider>
      </AssignmentContext.Provider>
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
