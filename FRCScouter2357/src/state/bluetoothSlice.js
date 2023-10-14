import { createSlice } from '@reduxjs/toolkit';

export const bluetoothSlice = createSlice({
  name: 'bluetooth',
  initialState: {
    currentMatch: null,
    assignment: null,
  },
  reducers: {
    setMatch: (state, {payload}) => {
      state.currentMatch = payload;
    },
    setAssignment: (state, {payload}) => {
      state.assignment = payload;
    },
  },
});

export const { setMatch, setAssignment } = bluetoothSlice.actions;
export default bluetoothSlice.reducer;
