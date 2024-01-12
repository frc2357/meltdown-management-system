import { Box, Button, Text } from '@react-native-material/core';
import { useCameraPermission, useCameraDevice, Camera } from 'react-native-vision-camera';

import React, { useEffect } from 'react';

export const QRCapture = ({ navigation }) => {
  const { hasPermission, requestPermission } = useCameraPermission();

  const device = useCameraDevice('back');

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, []);

  const cam =
    device === null ? (
      <Text>No camera</Text>
    ) : (
      <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
    );

  return (
    <Box>
      {cam}
      <Button
        title="Next"
        variant="contained"
        onPress={() => {
          navigation.navigate('PrematchScreen');
        }}
      />
    </Box>
  );
};
