import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import { Button } from '@react-native-material/core';

export const QRShow = ({navigation}) => {
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
