import React, { useEffect, useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { Box, Button, HStack } from '@react-native-material/core';
import { TQRShowProps } from '../../../types';
import { LoadingWrapper } from '../loadingScreens/LoadingWrapper';
import fs from 'react-native-fs';
import { zip } from 'react-native-zip-archive';
import { useLog } from '../../contexts/LogContext';

export const QRShow: React.FC<TQRShowProps> = ({ navigation }) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [qrContent, setQrContent] = useState<string>('a');
  const log = useLog();

  const generateQRCode = async () => {
    const logs = `${fs.DocumentDirectoryPath}/logs`;
    const unzippedPath = `${logs}/unzipped`;
    const zippedPath = `${logs}/zipped`;

    const fileName: string = `${log.alliance}-${log.alliancePos}-match-${log.teamNum}`;
    const logString: string = JSON.stringify(log);

    await fs.writeFile(`${unzippedPath}/${fileName}`, logString);

    await zip([`${unzippedPath}/${fileName}`], `${zippedPath}/${fileName}`);

    const output = await fs.readFile(`${zippedPath}/${fileName}`, 'ascii');
    console.log(output);

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
      <Box style={{alignItems: 'center'}}>
      <QRCode value={qrContent} size={500} quietZone={10}/>
      </Box>
      <Button
        title="Startup"
        variant="contained"
        onPress={() => {
          navigation.navigate('Startup');
        }}
      />
    </LoadingWrapper>
  );
};
