import { createSlice } from '@reduxjs/toolkit';

export const bluetoothSlice = createSlice({
  name: 'bluetooth',
  initialState: {
    device: null,
    currentMatch: null,
    assignment: null,
  },
  reducers: {
    setDevice: (state, {payload}) => {
      state.device = payload;
    },
    setMatch: (state, {payload}) => {
      state.currentMatch = payload;
    },
    setAssignment: (state, {payload}) => {
      state.assignment = payload;
    },
    upload: (state, action) => {
      const matchLog = JSON.stringify(action.payload);
      state.device.write(matchLog, 'ascii');
    },
  },
});

export const { upload, setDevice, setMatch, setAssignment } = bluetoothSlice.actions;
export default bluetoothSlice.reducer;
