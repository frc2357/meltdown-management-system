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
};

export const matchLogSlice = createSlice({
  name: 'matchLog',
  initialState,
  reducers: {
    newMatch: (
      state,
      { payload: { teamNum, scouterName, matchNum, alliance, startPos, preload } }
    ) => {
      state.match = {
        ...initialState.match,
        teamNum,
        scouterName,
        matchNum,
        alliance,
        startPos,
        preload,
      };
      console.log(state);
    },
    addPickup: (state, { payload: { piece, location, isAuto } }) => {
      state.match.events.push({ type: 'pickup', piece, location, isAuto });
    },
    addDrop: (state, { payload: { piece, isAuto } }) => {
      state.match.events.push({ type: 'drop', piece, isAuto });
    },
    addScore: (state, { payload: { piece, row, col, isAuto } }) => {
      state.match.events.push({ type: 'score', piece, row, col, isAuto });
    },
    addAuto: (state, { payload: { hasMobility, loc } }) => {
      state.match.events.push({ type: 'auto', hasMobility, loc });
    },
    addEndgame: (state, { payload: { loc, notes } }) => {
      state.match.events.push({ type: 'endgame', loc });
      state.match.notes = notes;
      console.log(state);
    },
  },
});

export const { newMatch, addPickup, addDrop, addScore, addAuto, addEndgame } =
  matchLogSlice.actions;
export default matchLogSlice.reducer;
