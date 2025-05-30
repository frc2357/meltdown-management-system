import React, { useEffect, useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { Box, Button, HStack } from '@react-native-material/core';
import { TRootStackParamList } from '../../../types';
import { LoadingWrapper } from '../loadingScreens/LoadingWrapper';
import { useFileManager } from '../../hooks/useFileManager';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type PQRShow = NativeStackScreenProps<TRootStackParamList, 'QRShow'>;

export function QRShow({
  navigation,
  route: {
    params: { routeName, path },
  },
}: PQRShow): React.JSX.Element {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [qrContent, setQrContent] = useState<string>('a');
  const fileManager = useFileManager();

  const generateQRCode: () => Promise<void> = async (): Promise<void> => {
    const output: string = await fileManager.getZippedLog(path);
    setQrContent(output);
    setLoading(false);
  };

  useEffect((): void => {
    setLoading(true);

    generateQRCode().catch((err: Error): void => {
      console.log(JSON.stringify(err));
    });
  }, []);

  return (
    <LoadingWrapper message="QR Code Generating" isLoading={isLoading}>
      <HStack spacing={130} style={{ alignContent: 'center', alignItems: 'center' }}>
        <Button
          style={{
            margin: 20,
            height: 38,
          }}
          title={routeName}
          variant="contained"
          onPress={() => {
            navigation.navigate(routeName);
          }}
        />
        <Box style={{ alignItems: 'center' }}>
          <QRCode value={qrContent} size={550} quietZone={10} />
        </Box>
      </HStack>
    </LoadingWrapper>
  );
}
