import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import { Button } from '@react-native-material/core';

export type TQRShowProps = {}

export const QRShow: React.FC<TQRShowProps> = ({navigation}) => {
  return (
    <>
      <QRCode value="garbage" />
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
