import {configureStore} from "@reduxjs/toolkit"
import bluetoothSlice from "./bluetoothSlice"

export default configureStore({
    reducer: {
        bluetooth: bluetoothSlice
    }
})