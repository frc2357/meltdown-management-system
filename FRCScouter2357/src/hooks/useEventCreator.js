import { useSelector } from 'react-redux';

export default function useEventCreator() {
  const startTimeSeconds = useSelector((state) => state.matchLog.startTimeSeconds);

  const createStart = (location, piece) => {
    const type = 'start';
    return { type, location, piece, timestamp: 0 };
  };

  const createPickup = (piece, location, isAuto) => {
    const type = 'pickup';
    return createEvent({ type, piece, location, isAuto });
  };
  const createDrop = (piece, isAuto) => {
    const type = 'drop';
    return createEvent({ type, piece, isAuto });
  };
  const createScore = (piece, row, col, isAuto) => {
    const type = 'score';
    return createEvent({ type, piece, row, col, isAuto });
  };
  const createAuto = (hasMobility, location) => {
    const type = 'auto';
    return createEvent({ type, hasMobility, location });
  };
  const createEndgame = (location, notes) => {
    const type = 'endgame';
    return createEvent({ type, location, notes });
  };

  const createEvent = (obj) => {
    const timeStamp = Date.now() / 1000 - startTimeSeconds;
    const event = { timestamp: timeStamp, ...obj };
    console.log(event);
    return event;
  };

  return {
    createStart,
    createPickup,
    createDrop,
    createScore,
    createAuto,
    createEndgame,
  };
}
