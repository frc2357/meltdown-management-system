import { createSlice } from '@reduxjs/toolkit';
import RNBluetoothClassic from 'react-native-bluetooth-classic';

export const bluetoothSlice = createSlice({
  name: 'bluetooth',
  initialState: {
    device: null,
    currentMatch: null,
    assignment: null,
    bluetoothSub: null,
  },
  reducers: {
    init: (state) => {
      state.bluetoothSub  = RNBluetoothClassic.onDeviceConnected((event) => {
        state.device = event.device;
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
      return true;
    },
    isInit: (state) => {
      return state.device != null;
    },
    getMatch: (state) => {
      return state.currentMatch;
    },
    getAssignment: (state) => {
      return state.assignment;
    },
    upload: (state, action) => {
      const matchLog = JSON.stringify(action.payload);
      state.device.write(matchLog, 'ascii');
    },
    cleanup: (state) => {
      state.bluetoothSub.remove();
      return true;
    },
  },
});

export const { init, isInit, getMatch, getAssignment, upload, cleanup } = bluetoothSlice.actions;
export default bluetoothSlice.reducer;
