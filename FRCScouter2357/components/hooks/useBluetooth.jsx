import { useEffect, useState, useRef } from 'react';
import RNBluetoothClassic from 'react-native-bluetooth-classic';

export default function BluetoothManager() {
  const [device, setDevice] = useState();
  const [currentMatch, setCurrentMatch] = useState();
  const [assignment, setAssignment] = useState();
  const bluetoothSub = useRef();

  useEffect(() => {
    bluetoothSub.current = RNBluetoothClassic.onDeviceConnected((event) => {
      setDevice(event.device);

      if (device.isConnected()) {
        device.onDataReceived((event) => {
          const data = event.data;

          switch (data.type) {
            case 'match':
              setCurrentMatch(data.info);
              break;
            case 'assignment':
              setAssignment(assignment.info);
              break;
          }
        });
      }
    });

    return () => {
      bluetoothSub.current.remove();
    };
  }, []);

  const getMatch = () => {
    return currentMatch;
  };

  const getAssignment = () => {
    return assignment;
  };

  const upload = (matchLog) => {
    JSON.stringify(matchLog);
    device.write(matchLog, 'ascii');
  };

  return {
    isInit: device !== null,
    getMatch,
    getAssignment,
    upload,
  };
}
