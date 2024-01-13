import { Box, VStack, Button } from '@react-native-material/core';
import React from 'react';

export type TStartupProps = {};

export const Startup: React.FC<TStartupProps> = ({ navigation }) => {
  return (
    <Box>
      <VStack>
        <Button
          title="Match Logs"
          variant="contained"
          onPress={() => {
            navigation.navigate('MatchLogs');
          }}
        />
        <Button
          title="Scouting"
          variant="contained"
          onPress={() => {
            navigation.navigate('QRCapture');
          }}
        />
      </VStack>
    </Box>
  );
};
