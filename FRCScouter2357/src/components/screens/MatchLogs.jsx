import React from 'react';
import { Box, Button } from 'react-native-paper';

export const MatchLogs = ({ navigation }) => {
  return (
    <Box>
      <Button title="Startup" variant="contained" onPress={navigation.navigate('Startup')} />
    </Box>
  );
};
