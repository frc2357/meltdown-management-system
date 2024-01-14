import { createContext, useContext } from 'react';
import { TLog, TLogAction } from '../../types';
import { EEventTypes } from '../../types/EEventTypes';

export const LogContext: React.Context<TLog> = createContext<TLog>({
  teamNum: 0,
  scouter: '',
  matchNum: 0,
  alliance: 'RED',
  alliancePos: '1',
  events: [],
});

export const useLogs = () => {
  return useContext<TLog>(LogContext);
};

export const logsReducer = (log: TLog, action: TLogAction) => {
  switch (action.type) {
    case EEventTypes.start:
    case EEventTypes.auto:
    case EEventTypes.pickup:
    case EEventTypes.score:
    case EEventTypes.drop:
    case EEventTypes.endgame:
  }
};
