import React from 'react';
import { Box, Button } from '@react-native-material/core';

export const MatchLogs = ({ navigation }) => {
  return (
    <Box>
      <Button title="Startup" variant="contained" onPress={() => {navigation.navigate('Startup')}} />
    </Box>
  );
};
