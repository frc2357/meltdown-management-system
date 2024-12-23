import React, { createContext, MutableRefObject, useContext, useReducer, useRef } from 'react';
import { EEventTypes, TLog } from '../../../common/types';
import {
  EEndgameLocation2024,
  EPickupLocation2024,
  EScoreLocation2024,
  EStartLocation2024,
  TEvent2024,
} from '../../../common/types/2024';
import { useTimer } from './TimerContext';
import { useAssignment } from './AssignmentContext';
import { TLogActions } from '../../types';
import { useFileManager } from '../hooks/useFileManager';

const logDefault: TLog<TEvent2024> = {
  teamNum: 0,
  matchNum: 0,
  scouter: '',
  alliance: 'RED',
  alliancePos: '1',
  events: [],
};

const LogContext: React.Context<MutableRefObject<TLog<TEvent2024>>> =
  createContext<MutableRefObject<TLog<TEvent2024>>>(null);

export const useSaveLog: () => () => Promise<string> = (): (() => Promise<string>) => {
  const log = useContext<MutableRefObject<TLog<TEvent2024>>>(LogContext);
  const fileManager = useFileManager();

  return async () => {
    return fileManager.saveLog<TEvent2024>(log.current);
  };
};

export const useLog: () => TLogActions = (): TLogActions => {
  const log = useContext<MutableRefObject<TLog<TEvent2024>>>(LogContext);
  const assignment = useAssignment();
  const timer = useTimer();

  return {
    addStartEvent: (location: EStartLocation2024) => {
      log.current = {
        teamNum: assignment.currentMatch.teamNum,
        matchNum: assignment.currentMatch.matchNum,
        scouter: assignment.currentMatch.scouter,
        alliance: assignment.alliance,
        alliancePos: assignment.alliancePos,
        events: [
          {
            type: EEventTypes.start,
            location,
            timestamp: 0,
          },
        ],
      };

      timer.start();
    },
    addPickupEvent: (location: EPickupLocation2024) => {
      log.current.events.push({
        type: EEventTypes.pickup,
        location,
        timestamp: timer.getTimeSeconds(),
      });
    },
    modifyLastPickupEvent: (location: EPickupLocation2024) => {
      const idx = log.current.events.findLastIndex((event) => event.type === EEventTypes.pickup);
      if (idx !== -1) log.current.events[idx].location = location;
    },
    addDropEvent: () => {
      log.current.events.push({
        type: EEventTypes.drop,
        timestamp: timer.getTimeSeconds(),
      });
    },
    addScoreEvent: (location: EScoreLocation2024, x: number, y: number) => {
      x = Math.round(x + Number.EPSILON);
      y = Math.round(y + Number.EPSILON);
      log.current.events.push({
        type: EEventTypes.score,
        location,
        miss: false,
        x,
        y,
        timestamp: timer.getTimeSeconds(),
      });
    },
    missedLastScore: () => {
      const idx = log.current.events.findLastIndex((event) => event.type === EEventTypes.score);
      if (idx !== -1) log.current.events[idx].miss = true;
    },
    addAutoEvent: (leave: boolean) => {
      log.current.events.push({
        type: EEventTypes.auto,
        leave,
        timestamp: timer.getTimeSeconds(),
      });
    },
    addEndgameEvent: (
      location: EEndgameLocation2024,
      notes: string,
      harmony: boolean,
      trap: number,
      spotlit: boolean
    ) => {
      log.current.events.push({
        type: EEventTypes.endgame,
        location,
        notes,
        harmony,
        trap,
        spotlit,
        timestamp: timer.getTimeSeconds(),
      });
    },
  };
};

export function LogProvider({ children }: React.PropsWithChildren) {
  const log = useRef<TLog<TEvent2024>>(logDefault);

  return <LogContext.Provider value={log}>{children}</LogContext.Provider>;
}
