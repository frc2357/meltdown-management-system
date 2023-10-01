import { createSlice } from '@reduxjs/toolkit';
import RNBluetoothClassic from 'react-native-bluetooth-classic';

export const bluetoothSlice = createSlice({
  name: 'bluetooth',
  initialState: {
    device: null,
    currentMatch: null,
    assignment: null,
    bluetoothSub: null,
    isInit: false,
  },
  reducers: {
    init: (state) => {
      state.bluetoothSub = RNBluetoothClassic.onDeviceConnected((event) => {
        state.device = event.device;
        state.isInit = true;
        if (state.device.isConnected()) {
          state.device.onDataReceived((event) => {
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
        }
      });
    },
    upload: (state, action) => {
      const matchLog = JSON.stringify(action.payload);
      state.device.write(matchLog, 'ascii');
    },
    cleanup: (state) => {
      state.bluetoothSub.remove();

      state.device = null;
      state.currentMatch = null;
      state.assignment = null;
      state.bluetoothSub = null;
      state.isInit = false;
    },
  },
});

export const { init, isInit, getMatch, getAssignment, upload, cleanup } = bluetoothSlice.actions;
export default bluetoothSlice.reducer;
