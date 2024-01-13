import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import { Button, HStack } from '@react-native-material/core';
import { TQRShowProps } from '../../../types';

export const QRShow: React.FC<TQRShowProps> = ({ navigation }) => {
  const string = 'x'.repeat(2300); // Scan max: 1200, Generate max: 2300
  return (
    <>
      <QRCode value={JSON.stringify(string)} size={500} quietZone={10} />
      <Button
        title="Startup"
        variant="contained"
        onPress={() => {
          navigation.navigate('Startup');
        }}
      />
    </>
  );
};
