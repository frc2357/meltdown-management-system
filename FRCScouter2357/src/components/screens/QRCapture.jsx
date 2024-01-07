import { Box, Button } from '@react-native-material/core';
import React from 'react';

export const QRCapture = ({navigation}) => {
  return <Box>
    <Button title="Next" variant="contained" onPress={navigation.navigate('PrematchScreen')} />
  </Box>;
};
