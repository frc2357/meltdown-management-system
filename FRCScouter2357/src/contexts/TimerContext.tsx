import React, { createContext, useContext, useReducer, useState } from 'react';

const TimerContext = createContext<[number, React.Dispatch<React.SetStateAction<number>>]>([
  0,
  () => 0,
]);

export const useTimer = () => {
  const [startTimeSeconds, setTime] = useContext(TimerContext);

  const getTimeSeconds = (): number => {
    const timestampSeconds: number = (Date.now() / 1000) - startTimeSeconds;
    return Math.round((timestampSeconds + Number.EPSILON) * 100) / 100;
  };

  const start = () => {
    setTime(Date.now() / 1000);
  };

  return {
    getTimeSeconds,
    start,
  };
};

export const TimerProvider: React.FC<React.PropsWithChildren> = ({
  children,
}: React.PropsWithChildren) => {
  const [time, setTime] = useState(0);

  return <TimerContext.Provider value={[time, setTime]}>{children}</TimerContext.Provider>;
};
