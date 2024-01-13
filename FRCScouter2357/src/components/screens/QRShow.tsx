import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import { Button } from '@react-native-material/core';
import { TQRShowProps } from '../../../types';

export const QRShow: React.FC<TQRShowProps> = ({ navigation }) => {
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
