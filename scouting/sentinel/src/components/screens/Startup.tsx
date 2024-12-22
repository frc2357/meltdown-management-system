import { Box, VStack, Button, Text } from '@react-native-material/core';
import React, { useEffect } from 'react';
import { TFileManager, TRootStackParamList } from '../../../types';
import { useFileManager } from '../../hooks/useFileManager';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type PStartup = NativeStackScreenProps<TRootStackParamList, 'Startup'>;

export function Startup({ navigation }: PStartup): React.JSX.Element {
  const fileManager: TFileManager = useFileManager();

  useEffect((): void => {
    fileManager.createBaseDirs();
  }, []);

  return (
    <Box style={{ margin: 20, alignItems: 'center' }}>
      <VStack spacing={50}>
        <Text variant="h1">Sentinel</Text>
        <Button
          title="Match Logs"
          variant="contained"
          onPress={(): void => {
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
}
