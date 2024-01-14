import React from 'react';
import { TeleopLayout } from './src/components/layouts/TeleopLayout';
import { Prematch } from './src/components/screens/Prematch';
import { Endgame } from './src/components/screens/Endgame';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ERobotStates, TRootStackParamList } from './types';
import { AssignmentContext } from './src/contexts/AssignmentContext';
import { LogsContext } from './src/contexts/LogsContext';
import { Startup } from './src/components/screens/Startup';
import { QRCapture } from './src/components/screens/QRCapture';
import { QRShow } from './src/components/screens/QRShow';
import { MatchLogs } from './src/components/screens/MatchLogs';
import { StatusBar } from 'expo-status-bar';

const NavStack = createNativeStackNavigator<TRootStackParamList>();

function App() {
  return (
    <>
      <StatusBar hidden={true} />
      <AssignmentContext.Provider value={{}}>
        <LogsContext.Provider value={{}}>
          <NavigationContainer>
            <NavStack.Navigator initialRouteName="Startup" screenOptions={{ headerShown: false }}>
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
                name="Prematch"
                component={Prematch}
                options={{ headerShown: false }}
              />
              <NavStack.Screen
                name="TeleopLayout"
                component={TeleopLayout}
                options={{ headerShown: false }}
                initialParams={{ initialRobotState: ERobotStates.empty, isAuto: false }}
              />
              <NavStack.Screen
                name="Endgame"
                component={Endgame}
                options={{ headerShown: false }}
              />
              <NavStack.Screen name="QRShow" component={QRShow} options={{ headerShown: false }} />
            </NavStack.Navigator>
          </NavigationContainer>
        </LogsContext.Provider>
      </AssignmentContext.Provider>
    </>
  );
}

export default App;
