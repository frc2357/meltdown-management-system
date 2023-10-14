import { useState } from 'react';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import { useDispatch } from 'react-redux';
import { setAssignment, setDevice, setMatch } from '../state/bluetoothSlice';

export default function useConnectBluetooth() {
  const dispatch = useDispatch();

  const connect = async () => {
    const devices = await RNBluetoothClassic.getBondedDevices();

    if (!devices) {
      console.log('No Paired Devices');
      return false;
    }

    console.log(devices);

    let connected = false;

    while (!connected) {
      connected = await devices[0].connect({
        CONNECTOR_TYPE: 'rfcomm',
        DELIMITER: '\n',
        DEVICE_CHARSET: 'ascii',
        READ_TIMEOUT: 5000,
        SECURE_SOCKET: true,
      });
    }

    if (connected) {
      console.log('Device connected');

      devices[0].onDataReceived((event) => {
        console.log(JSON.stringify(event));

        const data = event.data;

        switch (data.type) {
          case 'match':
            dispatch(setMatch(data.info));
            break;
          case 'assignment':
            dispatch(setAssignment(data.info));
            break;
        }
      });

      dispatch(setDevice(devices[0]));
      return true;
    } else {
      console.log('Device not connected ');
      return false;
    }
  };

  return connect;
}
