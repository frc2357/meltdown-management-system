import RNBluetoothClassic from 'react-native-bluetooth-classic';
import { useDispatch } from 'react-redux';
import { setAssignment, setMatch } from '../state/bluetoothSlice';
import { useRef } from 'react';

export default function useBluetooth() {
  const device = useRef();

  const dispatch = useDispatch();

  const connect = async () => {
    if (!device.current) {
      const devices = await RNBluetoothClassic.getBondedDevices();

      if (!devices) {
        console.log('No Paired Devices');
        return false;
      }

      device.current = devices[0];
    }

    if (await device.current.isConnected()) {
      await device.current.disconnect();
    }

    let connected = false;

    while (!connected) {
      try {
        connected = await device.current.connect({
          CONNECTOR_TYPE: 'rfcomm',
          DELIMITER: '\n',
          DEVICE_CHARSET: 'ascii',
          READ_TIMEOUT: 5000,
          SECURE_SOCKET: true,
        });
        if (!connected) {
          console.log('Connection failed, retrying');
        }
      } catch (error) {
        console.log(error);
        connected = false;
      }
    }

    console.log('Device connected');

    device.current.onDataReceived((event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case 'match':
          dispatch(setMatch(data.info));
          break;
        case 'assignment':
          dispatch(setAssignment(data.info));
          break;
      }
    });

    return true;
  };

  const upload = async (data) => {
    const dataJson = JSON.stringify(data) + '\n';

    try {
      const success = await device.current.write(dataJson, 'ascii');

      console.log('Upload Status: ' + success);
      return success;
    } catch (err) {
      console.log('Error uploading');
      console.log(err);
    }

    return false;
  };

  const isConnected = async () => {
    return await device.current.isConnected();
  };

  return {
    connect,
    upload,
    isConnected,
  };
}
