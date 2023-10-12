import { useSelector } from 'react-redux';

export function createPickup(piece, location, isAuto) {
  const type = 'pickup';
  return createEvent(type, piece, location, isAuto);
}
export function createDrop(piece, isAuto) {
  const type = 'drop';
  return createEvent(type, piece, isAuto);
}
export function createScore(piece, row, col, isAuto) {
  const type = 'score';
  return createEvent(type, piece, row, col, isAuto);
}
export function createAuto(hasMobility, loc) {
  const type = 'auto';
  return createEvent(type, hasMobility, loc);
}
export function createEndgame(loc) {
  const type = 'endgame';
  return createEvent(type, loc);
}

function createEvent(...args) {
  const startTime = useSelector((state) => state.startTimeSeconds);
  const timeStamp = Math.floor(Date.now() / 1000) - startTime;
  return { timestamp: timeStamp, args };
}
