import React, { createContext, useContext, useReducer } from 'react';
import { ELogActionType, TLogAction } from '../../types';
import { TLog } from '../../../common/types';
import { TEvent2024 } from '../../../common/types/2024';

const logDefault: TLog<TEvent2024> = {
  teamNum: 0,
  matchNum: 0,
  scouter: '',
  alliance: 'RED',
  alliancePos: '1',
  events: [],
};

const LogContext: React.Context<TLog<TEvent2024>> = createContext<TLog<TEvent2024>>(logDefault);

const LogDispatchContext: React.Context<React.Dispatch<TLogAction>> =
  createContext<React.Dispatch<TLogAction>>(null);

export const useLog: () => TLog<TEvent2024> = (): TLog<TEvent2024> => {
  return useContext<TLog<TEvent2024>>(LogContext);
};

export const useLogDispatch: () => React.Dispatch<TLogAction> = (): React.Dispatch<TLogAction> => {
  return useContext<React.Dispatch<TLogAction>>(LogDispatchContext);
};

export function LogProvider({ children }: React.PropsWithChildren) {
  const [log, dispatch] = useReducer<React.Reducer<TLog<TEvent2024>, TLogAction>>(
    logReducer,
    logDefault
  );

  return (
    <LogContext.Provider value={log}>
      <LogDispatchContext.Provider value={dispatch}>{children}</LogDispatchContext.Provider>
    </LogContext.Provider>
  );
}

export const logReducer: React.Reducer<TLog<TEvent2024>, TLogAction> = (
  log: TLog<TEvent2024>,
  action: TLogAction
): TLog<TEvent2024> => {
  switch (action.type) {
    case ELogActionType.initLog:
      const newLog: TLog<TEvent2024> = { ...action.assignment, events: [] };

      return newLog;
    case ELogActionType.addEvent:
      log.events.push(action.event);
      return log;
  }
};
