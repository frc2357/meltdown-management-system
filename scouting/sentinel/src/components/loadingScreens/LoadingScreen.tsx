import { Box, Text, Button } from '@react-native-material/core';
import { LoadingSymbol } from '../basics/LoadingSymbol';
import React from 'react';

export type PLoadingScreen = {
  message: string;
  buttonText?: string;
  onPress?: () => void;
};

export function LoadingScreen({ message, buttonText, onPress }: PLoadingScreen): React.JSX.Element {
  const getButton = () => {
    return buttonText && onPress ? (
      <Button variant="outlined" title={buttonText} onPress={onPress} />
    ) : (
      <></>
    );
  };

  return (
    <Box>
      <LoadingSymbol />
      <Text variant="h5">{message}</Text>
      {getButton()}
    </Box>
  );
}
