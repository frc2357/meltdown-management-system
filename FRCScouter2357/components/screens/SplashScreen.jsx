import { Box, Text } from '@react-native-material/core';
import LoadingSymbol from '../basics/LoadingSymbol';
import React from 'react';
import PropTypes from 'prop-types';

SplashScreen.propTypes = {
  route: PropTypes.object,
};

export default function SplashScreen() {
  return (
    <Box>
      <LoadingSymbol />
      <Text variant="h1">Waiting for Scouting Center to Assign Me</Text>
    </Box>
  );
}
