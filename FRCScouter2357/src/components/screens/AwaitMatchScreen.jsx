import React from 'react';
import { useSelector } from 'react-redux';
import LoadingScreen from './LoadingScreen';

export default function AwaitMatchScreen() {
  const assignment = useSelector((state) => state.bluetooth.assignment);

  const scouter = assignment?.scouter ? assignment.scouter : "";
  const id = assignment?.id ? assignment.id : "";

  const message =
    'Hello ' +
    scouter +
    ', you are assigned to ' +
    id +
    '.Waiting for next match assignment.';

  return <LoadingScreen message={message} />;
}
