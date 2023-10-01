import React from 'react';
import { useSelector } from 'react-redux';
import LoadingScreen from './LoadingScreen';

export default function AwaitMatchScreen() {
  const assignment = useSelector((state) => state.bluetooth.assignment);

  const message =
    'Hello ' +
    assignment.scouter +
    ', you are assigned to ' +
    assignment.id +
    '.\nWaiting for next match assignment';
    
  return <LoadingScreen message={message} />;
}
