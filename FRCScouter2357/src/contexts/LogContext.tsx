import React, { createContext, useContext, useReducer } from 'react';
import { ELogActionType, TLog, TLogAction } from '../../types';
import { useTimer } from './TimerContext';

const logDefault: TLog = {
  teamNum: 0,
  scouter: '',
  matchNum: 0,
  alliance: 'RED',
  alliancePos: '1',
  events: [],
};

const LogContext: React.Context<TLog> = createContext<TLog>(logDefault);

const LogDispatchContext: React.Context<React.Dispatch<TLogAction>> =
  createContext<React.Dispatch<TLogAction>>(null);

export const useLog: () => TLog = (): TLog => {
  return useContext<TLog>(LogContext);
};

export const useLogDispatch: () => React.Dispatch<TLogAction> = (): React.Dispatch<TLogAction> => {
  return useContext<React.Dispatch<TLogAction>>(LogDispatchContext);
};

export const LogProvider: React.FC<React.PropsWithChildren> = ({
  children,
}: React.PropsWithChildren) => {
  const [log, dispatch] = useReducer<React.Reducer<TLog, TLogAction>>(logReducer, logDefault);

  return (
    <LogContext.Provider value={log}>
      <LogDispatchContext.Provider value={dispatch}>{children}</LogDispatchContext.Provider>
    </LogContext.Provider>
  );
};

export const logReducer: React.Reducer<TLog, TLogAction> = (
  log: TLog,
  action: TLogAction
): TLog => {
  switch (action.type) {
    case ELogActionType.initLog:
      const newLog: TLog = { ...action.assignment, events: [] };
    
      console.log(JSON.stringify(newLog, null, 1));
      return newLog;
    case ELogActionType.addEvent:
      log.events.push(action.event);
      console.log(JSON.stringify(log, null, 1));
      return log;
  }
};
