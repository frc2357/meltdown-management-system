import React, { useEffect, useState, useRef } from 'react';
import { Provider } from '@react-native-material/core';
import { DeviceEventEmitter, StyleSheet } from 'react-native';
import TeleopLayout from './src/components/layouts/TeleopLayout';
import PrematchScreen from './src/components/screens/PrematchScreen';
import AutoScreen from './src/components/screens/AutoScreen';
import EndgameScreen from './src/components/screens/EndgameScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AwaitAssignmentScreen from './src/components/loadingScreens/AwaitAssignmentScreen';
import robotStates from './src/util/robotStates';
import useBluetooth from './src/hooks/useBluetooth';
import { useDispatch, useSelector } from 'react-redux';
import store from './src/state/store';
import AwaitBluetoothConnectScreen from './src/components/loadingScreens/AwaitBluetoothConnectScreen';
import { setMatch } from './src/state/bluetoothSlice';
import ReUploadScreen from './src/components/loadingScreens/ReuploadScreen';

const NavStack = createNativeStackNavigator();

function App() {
  const { connect, upload } = useBluetooth();
  const [isInit, setInit] = useState(false);
  const isConnectOnUpload = useRef(false);
  const [isUploading, setUploading] = useState(false);
  const assignment = useSelector((state) => state.bluetooth.assignment);
  const dispatch = useDispatch();

  const uploadMatch = async () => {
    const matchLog = store.getState().matchLog.match;

    if (isConnectOnUpload.current) {
      let connected = false;
      try {
        connected = await connect();
      } catch (err) {
        connected = false;
      }
      if (!connected) return;
    }

    const success = await upload(matchLog);

    if (success) {
      dispatch(setMatch(null));
    }

    isConnectOnUpload.current = !success;
    setUploading(!success);
  };

  useEffect(() => {
    if (isInit) {
      return;
    }
    connect()
      .then((isInit) => {
        setInit(isInit);
      })
      .catch((err) => {
        console.log(err);
        setInit(false);
      });
  }, [isInit]);

  useEffect(() => {
    DeviceEventEmitter.addListener('event.reconnect', () => {
      setInit(false);
    });

    DeviceEventEmitter.addListener('event.uploadMatch', async () => {
      await uploadMatch();
    });

    return () => {
      DeviceEventEmitter.removeAllListeners('event.uploadMatch');
      DeviceEventEmitter.removeAllListeners('event.reconnect');
    };
  }, []);

  if (isUploading) {
    return <ReUploadScreen />;
  }

  if (!isInit) {
    return <AwaitBluetoothConnectScreen />;
  }

  if (!assignment) {
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
