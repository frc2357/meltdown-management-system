import React from 'react';
import ReconnectLoadingScreen from './ReconnectLoadingScreen';

export default function AwaitBluetoothConnectScreen() {
  return (
    <ReconnectLoadingScreen message="Trying to Connect to Scouting Center device..."/>
  );
}
