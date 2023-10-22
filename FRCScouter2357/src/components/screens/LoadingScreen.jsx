import { Box, Text, Button } from '@react-native-material/core';
import LoadingSymbol from '../basics/LoadingSymbol';
import React from 'react';
import PropTypes from 'prop-types';
import { DeviceEventEmitter } from 'react-native';

LoadingScreen.propTypes = {
  message: PropTypes.string.isRequired,
};

export default function LoadingScreen({ message }) {
  return (
    <Box>
      <LoadingSymbol />
      <Text variant="h5">{message}</Text>
      <Button
        variant="outlined"
        title="Retry Connect"
        onPress={() => DeviceEventEmitter.emit('event.reconnect')}
      />
    </Box>
  );
}
