import React from 'react';
import LoadingScreen from './LoadingScreen';
import { DeviceEventEmitter } from 'react-native';

export default function ReuploadScreen() {
  return (
    <LoadingScreen
      message="Uploading failed, notify scouting lead and try again"
      buttonText="Reupload"
      onPress={() => DeviceEventEmitter.emit('event.uploadMatch')}
    />
  );
}
