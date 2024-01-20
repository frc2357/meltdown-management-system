import { Box, VStack, Button } from '@react-native-material/core';
import React, { useEffect } from 'react';
import { TStartupProps } from '../../../types';
import { useFileManager } from '../../hooks/useFileManager';

export const Startup: React.FC<TStartupProps> = ({ navigation }) => {
  const fileManager = useFileManager();

  useEffect(() => {
    fileManager.createBaseDirs();
  }, []);

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
