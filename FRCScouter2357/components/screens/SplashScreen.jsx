import { Box, Text } from '@react-native-material/core';
import { LoadingSymbol } from '../basics/LoadingSymbol';
import React from 'react';
import PropTypes from 'prop-types';

SplashScreen.propTypes = {
  useBluetooth: PropTypes.object,
};

export default function SplashScreen({ navigation, useBluetooth }) {
  if (useBluetooth.isInit) {
    navigation.navigate("TeleopLayout");
  }

  return (
    <Box>
      <LoadingSymbol />
      <Text variant="h1">Waiting for Scouting Center to Assign Me</Text>
    </Box>
  );
}
