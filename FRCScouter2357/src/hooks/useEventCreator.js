import { useSelector } from 'react-redux';

export default function useEventCreator() {

  const startTimeSeconds = useSelector((state) => state.matchLog.startTimeSeconds);
  
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
  const createAuto = (hasMobility, loc) => {
    const type = 'auto';
    return createEvent({ type, hasMobility, loc });
  };
  const createEndgame = (loc) => {
    const type = 'endgame';
    return createEvent({ type, loc });
  };

  const createEvent = (obj) => {
    const timeStamp = Math.floor(Date.now() / 1000) - startTimeSeconds;
    const event = { timestamp: timeStamp, ...obj };
    console.log(event);
    return event;
  };

  return {
    createPickup,
    createDrop,
    createScore,
    createAuto,
    createEndgame,
  };
}
