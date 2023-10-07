import { createSlice } from '@reduxjs/toolkit';

export const matchLogSlice = createSlice({
    name: 'matchLog',
    initialState: {
        match: {
            matchNum: "",
            teamNum: "",
            scouterName: "",
            preload: "",
            notes: "",
            events: []
        }
    },
    reducers: {
        newMatch: (state, action) => {

        },
        addEvent: (state, action) => {

        }
    }
})

export const { newMatch, addEvent } = matchLogSlice.actions;
export default matchLogSlice.reducer;