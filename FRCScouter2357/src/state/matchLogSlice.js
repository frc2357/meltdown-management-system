import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  match: {
    teamNum: '',
    scouterName: '',
    matchNum: '',
    alliance: '',
    alliancePos: '',
    events: [],
  },
  startTimeSeconds: 0,
};

export const matchLogSlice = createSlice({
  name: 'matchLog',
  initialState,
  reducers: {
    newMatch: (state, { payload: { teamNum, scouterName, matchNum, alliance, alliancePos } }) => {
      console.log(JSON.stringify(state));
      state.match = {
        ...initialState.match,
        teamNum,
        scouterName,
        matchNum,
        alliance,
        alliancePos
      };
      state.startTimeSeconds = Date.now() / 1000;
      console.log(state);
    },

    addEvent: (state, { payload }) => {
      state.match.events.push(payload);
    },
  },
});

export const { newMatch, addEvent } = matchLogSlice.actions;
export default matchLogSlice.reducer;
