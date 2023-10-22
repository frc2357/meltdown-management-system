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

    let connected = await device.current.isConnected();

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
      console.log(JSON.stringify(event));

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

  const upload = (data) => {
    // console.log(device.current);
    const dataJson = JSON.stringify(data) + '\n';
    device.current
      .write(dataJson, 'ascii')
      .then((success) => console.log('Upload Status: ' + success))
      .catch((err) => {
        console.log('Error uploading');
        console.log(err);
      });
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
