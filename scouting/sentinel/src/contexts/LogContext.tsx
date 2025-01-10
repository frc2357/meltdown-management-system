import React, { createContext, MutableRefObject, useContext, useRef } from 'react';
import { EEventTypes, TLog } from '../../../common/types';
import {
  EEndgameLocation2025,
  EPickupLocation2025,
  EScoreLocation2025,
  EStartLocation2025,
  TEvent2025,
} from '../../../common/types/2025';
import { useTimer } from './TimerContext';
import { useAssignment } from './AssignmentContext';
import { ERobotState, TLogActions } from '../../types';
import { useFileManager } from '../hooks/useFileManager';

const logDefault: TLog<TEvent2025> = {
  teamNum: 0,
  matchNum: 0,
  scouter: '',
  alliance: 'RED',
  alliancePos: '1',
  events: [],
};

const LogContext: React.Context<MutableRefObject<TLog<TEvent2025>>> =
  createContext<MutableRefObject<TLog<TEvent2025>>>(null);

export const useSaveLog: () => () => Promise<string> = (): (() => Promise<string>) => {
  const log = useContext<MutableRefObject<TLog<TEvent2025>>>(LogContext);
  const fileManager = useFileManager();

  return async () => {
    return fileManager.saveLog<TEvent2025>(log.current);
  };
};

export const useLog: () => TLogActions = (): TLogActions => {
  const log = useContext<MutableRefObject<TLog<TEvent2025>>>(LogContext);
  const assignment = useAssignment();
  const timer = useTimer();

  return {
    addStartEvent: (location: EStartLocation2025) => {
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
    addPickupEvent: (location: EPickupLocation2025, gamepiece: ERobotState) => {
      log.current.events.push({
        type: EEventTypes.pickup,
        location,
        gamepiece,
        timestamp: timer.getTimeSeconds(),
      });
    },
    modifyLastPickupEvent: (location: EPickupLocation2025) => {
      const idx = log.current.events.findLastIndex((event) => event.type === EEventTypes.pickup);
      if (idx !== -1) log.current.events[idx] = { ...log.current.events[idx], location};
    },
    addDropEvent: () => {
      log.current.events.push({
        type: EEventTypes.drop,
        timestamp: timer.getTimeSeconds(),
      });
    },
    addScoreEvent: (location: EScoreLocation2025) => {
      log.current.events.push({
        type: EEventTypes.score,
        location,
        timestamp: timer.getTimeSeconds(),
      });
    },
    undoLastScore: () => {
      const idx = log.current.events.findLastIndex((event) => event.type === EEventTypes.score);
      if (idx !== -1) log.current.events.splice(idx, 1);
    },
    addAutoEvent: (leave: boolean) => {
      log.current.events.push({
        type: EEventTypes.auto,
        leave,
        timestamp: timer.getTimeSeconds(),
      });
    },
    addEndgameEvent: (location: EEndgameLocation2025, notes: string, clearAlgae: boolean) => {
      log.current.events.push({
        type: EEventTypes.endgame,
        location,
        notes,
        clearAlgae,
        timestamp: timer.getTimeSeconds(),
      });
    },
  };
};

export function LogProvider({ children }: React.PropsWithChildren) {
  const log = useRef<TLog<TEvent2025>>(logDefault);

  return <LogContext.Provider value={log}>{children}</LogContext.Provider>;
}
