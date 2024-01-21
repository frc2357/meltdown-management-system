import React, { useEffect, useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { Box, Button } from '@react-native-material/core';
import { TQRShowProps } from '../../../types';
import { LoadingWrapper } from '../loadingScreens/LoadingWrapper';
import { useFileManager } from '../../hooks/useFileManager';

export const QRShow: React.FC<TQRShowProps> = ({
  navigation,
  route: {
    params: { routeName, path },
  },
}) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [qrContent, setQrContent] = useState<string>('a');
  const fileManager = useFileManager();

  const generateQRCode = async () => {
    const output: string = await fileManager.getZippedLog(path);
    setQrContent(output);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);

    generateQRCode().catch((err) => {
      console.log(JSON.stringify(err));
    });
  }, []);

  return (
    <LoadingWrapper message="QR Code Generating" isLoading={isLoading}>
      <Box style={{ alignItems: 'center' }}>
        <QRCode value={qrContent} size={500} quietZone={10} />
      </Box>
      <Button
        title={routeName}
        variant="contained"
        onPress={() => {
          navigation.navigate(routeName);
        }}
      />
    </LoadingWrapper>
  );
};
