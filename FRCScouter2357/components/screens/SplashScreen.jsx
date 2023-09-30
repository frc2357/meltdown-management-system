import { Box, Text } from '@react-native-material/core';
import LoadingSymbol from '../basics/LoadingSymbol';
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { init } from '../../state/bluetoothSlice';

SplashScreen.propTypes = {
  route: PropTypes.object,
};

export default function SplashScreen({ navigation, route }) {
  const dispatch = useDispatch

  if (dispatch(init())) {
     navigation.navigate("TeleopLayout");
   }

  return (
    <Box>
      <LoadingSymbol />
      <Text variant="h1">Waiting for Scouting Center to Assign Me</Text>
    </Box>
  );
}
