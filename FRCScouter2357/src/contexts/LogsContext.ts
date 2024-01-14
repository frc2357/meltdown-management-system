import { createContext, useContext } from 'react';

export const LogsContext: React.Context<any> = createContext({});

export const useLogs = () => {
  return useContext(LogsContext);
}

export const logsReducer = (logs, action) => {

}