import { Box, Text } from '@react-native-material/core';
import LoadingSymbol from '../basics/LoadingSymbol';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useBluetooth from '../hooks/useBluetooth';

SplashScreen.propTypes = {
  route: PropTypes.object,
};

export default function SplashScreen({ navigation, route }) {
  const {useBluetooth} = route.params;
  const bluetooth = useBluetooth();

  console.log(bluetooth);

  if (bluetooth.isInit) {
     navigation.navigate("TeleopLayout", useBluetooth);
   }

  return (
    <Box>
      <LoadingSymbol />
      <Text variant="h1">Waiting for Scouting Center to Assign Me</Text>
    </Box>
  );
}
