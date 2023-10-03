import { Box, Text } from '@react-native-material/core';
import LoadingSymbol from '../basics/LoadingSymbol';
import React from 'react';
import PropTypes from 'prop-types';

LoadingScreen.propTypes = {
  message: PropTypes.string.isRequired,
};

export default function LoadingScreen({ message }) {
  return (
    <Box>
      <LoadingSymbol />
      <Text variant="h5">{message}</Text>
    </Box>
  );
}
