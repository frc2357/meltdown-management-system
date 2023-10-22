import React from 'react';
import { useSelector } from 'react-redux';
import ReconnectLoadingScreen from './ReconnectLoadingScreen';

export default function AwaitMatchScreen() {
  const assignment = useSelector((state) => state.bluetooth.assignment);

  const scouter = assignment?.scouter ? assignment.scouter : '';
  const id = assignment?.id ? assignment.id : '';

  const message =
    'Hello ' + scouter + ', you are assigned to ' + id + '.Waiting for next match assignment.';

  return <ReconnectLoadingScreen message={message} />;
}
