import React from 'react';
import LoadingScreen from './LoadingScreen';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';

ReconnectLoadingScreen.propTypes = {
  message: PropTypes.string.isRequired,
};
export default function ReconnectLoadingScreen({ message }) {
  return (
    <LoadingScreen
      message={message}
      buttonText="Retry Connect"
      onPress={() => DeviceEventEmitter.emit('event.reconnect')}
    />
  );
}
