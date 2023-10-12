import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  match: {
    teamNum: '',
    scouterName: '',
    matchNum: '',
    alliance: '',
    startPos: '',
    preload: '',
    notes: '',
    events: [],
  },
  startTimeSeconds: 0,
};

export const matchLogSlice = createSlice({
  name: 'matchLog',
  initialState,
  reducers: {
    newMatch: (
      state,
      { payload: { teamNum, scouterName, matchNum, alliance, startPos, preload, temp } }
    ) => {
      console.log(JSON.stringify(state));
      state.match = {
        ...initialState.match,
        teamNum,
        scouterName,
        matchNum,
        alliance,
        startPos,
        preload,
      };
      state.startTimeSeconds = Math.floor(Date.now() / 1000);
      console.log(state);
    },

    addEvent: (state, { payload }) => {
      state.match.events.push(payload);
    },
    addNotes: (state, { payload }) => {
      state.match.notes = payload;
    },
  },
});

export const { newMatch, addEvent, addNotes } = matchLogSlice.actions;
export default matchLogSlice.reducer;
