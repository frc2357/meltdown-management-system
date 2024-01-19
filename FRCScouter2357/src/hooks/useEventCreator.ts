import React from 'react';
import {
  EEndgameLocation,
  EPickupLocation,
  EScoreLocation,
  EStartLocation,
  TEvent,
} from '../../types';
import { EEventTypes } from '../../types/EEventTypes';
import { useTimer } from '../contexts/TimerContext';

export const useEventCreator = () => {
  const timer = useTimer();

  const createStart = (location: EStartLocation): TEvent => {
    const type = EEventTypes.start;
    return { type, location, timestamp: 0 };
  };

  const createPickup = (location: EPickupLocation): TEvent => {
    const type = EEventTypes.pickup;
    return createEvent({ type, location });
  };
  const createDrop = (): TEvent => {
    const type = EEventTypes.drop;
    return createEvent({ type });
  };

  const createMiss = (): TEvent => {
    const type = EEventTypes.miss;
    return createEvent({ type });
  };

  const createScore = (location: EScoreLocation): TEvent => {
    const type = EEventTypes.score;
    return createEvent({ type, location });
  };

  const createAuto = (leave: boolean): TEvent => {
    const type = EEventTypes.auto;
    return createEvent({ type, leave });
  };

  const createEndgame = (
    location: EEndgameLocation,
    notes: string,
    harmony: boolean,
    spotlit: boolean,
    trap: boolean
  ): TEvent => {
    const type = EEventTypes.endgame;
    return createEvent({ type, location, notes, harmony, spotlit, trap });
  };

  const createEvent = (obj): TEvent => {
    const timeStamp = timer.getTimeSeconds();
    const event = { timestamp: timeStamp, ...obj };
    return event;
  };

  return {
    createStart,
    createPickup,
    createDrop,
    createMiss,
    createScore,
    createAuto,
    createEndgame,
  };
};
