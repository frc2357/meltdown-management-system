import { createSlice } from '@reduxjs/toolkit';
import RNBluetoothClassic from 'react-native-bluetooth-classic';

export const bluetoothSlice = createSlice({
  name: 'bluetooth',
  initialState: {
    device: null,
    currentMatch: null,
    assignment: null,
    isInit: false,
  },
  reducers: {
    init: (state) => {
      RNBluetoothClassic.getBondedDevices().then((devices) => {
        console.log(devices);

        const connect = () => {
          devices[0]
            .connect({
              CONNECTOR_TYPE: 'rfcomm',
              DELIMITER: '\n',
              DEVICE_CHARSET: 'ascii',
              READ_TIMEOUT: 300,
              SECURE_SOCKET: true,
            })
            .then((connected) => {
              if (connected) {
                console.log('Device connected');
                state.isInit = true;
                devices[0].onDataReceived((event) => {
                  console.log(JSON.stringify(event));

                  const data = event.data;

                  switch (data.type) {
                    case 'match':
                      state.currentMatch = data.info;
                      break;
                    case 'assignment':
                      state.assignment = data.info;
                      break;
                  }
                });
              } else {
                console.log('Device not connected ');
                connect();
              }
            }).catch((error) => {
              //console.log(error);
              connect();
            });
        };

        connect();

        state.device = devices[0];
      });
    },
    upload: (state, action) => {
      const matchLog = JSON.stringify(action.payload);
      state.device.write(matchLog, 'ascii');
    },
  },
});

export const { init, upload } = bluetoothSlice.actions;
export default bluetoothSlice.reducer;
