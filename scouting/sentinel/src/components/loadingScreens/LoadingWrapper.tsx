import React from 'react';
import { LoadingScreen } from './LoadingScreen';

export function LoadingWrapper({
  children,
  message,
  isLoading,
}: React.PropsWithChildren<{ message: string; isLoading: boolean }>): React.JSX.Element {
  if (isLoading) {
    return <LoadingScreen message={message} />;
  }

  return <>{children}</>;
}
