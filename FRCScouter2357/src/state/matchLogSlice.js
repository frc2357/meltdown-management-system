import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  match: {
    matchNum: '',
    teamNum: '',
    scouterName: '',
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
        ...initialState,
        teamNum,
        scouterName,
        matchNum,
        alliance,
        startPos,
        preload,
      };
    },
    addPickup: (state, { payload: { piece, location, floor, isAuto } }) => {
      state.events.push({ type: 'pickup', piece, location, floor, isAuto });
    },
    addDrop: (state, { payload: { piece, isAuto } }) => {
      state.events.push({ type: 'drop', piece, isAuto });
    },
    addScore: (state, { payload: { piece, row, col, isAuto } }) => {
      state.events.push({ type: 'score', piece, row, col, isAuto });
    },
    addAuto: (state, { payload: { hasMobility, loc } }) => {
      state.events.push({ type: 'auto', hasMobility, loc });
    },
    addEndgame: (state, { payload: { loc } }) => {
      state.events.push({ type: 'endgame', loc });
    },
    addNotes: (state, { payload }) => {
      state.match.notes = payload;
    },
  },
});

export const { newMatch, addPickup, addDrop, addScore, addAuto, addEndgame, addNotes } =
  matchLogSlice.actions;
export default matchLogSlice.reducer;
