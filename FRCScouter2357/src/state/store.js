import { configureStore } from '@reduxjs/toolkit';
import bluetoothSlice from './bluetoothSlice';
import matchLogSlice from './matchLogSlice';

export default configureStore({
  reducer: {
    bluetooth: bluetoothSlice,
    matchLog: matchLogSlice,
  },
});
