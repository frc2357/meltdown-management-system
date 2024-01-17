import React, { useEffect, useState } from 'react';
import { Box, Button, Text } from '@react-native-material/core';
import fs from 'react-native-fs';
import { TMatchLogsProps } from '../../../types';
import { zip } from 'react-native-zip-archive';

const sampleMatch = {
  teamNum: '1986',
  scouterName: 'test2',
  matchNum: 6,
  alliance: 'RED',
  alliancePos: '2',
  events: [
    { type: 'start', location: 'open lane', piece: 'cone', timestamp: 0 },
    { timestamp: 38.723999977111816, type: 'score', piece: 'cone', row: 0, col: 0, isAuto: false },
    {
      timestamp: 48.812000036239624,
      type: 'pickup',
      piece: 'cube',
      location: 'doubleSub',
      isAuto: false,
    },
    { timestamp: 59.20300006866455, type: 'score', piece: 'cone', row: 0, col: 5, isAuto: false },
    {
      timestamp: 67.32100009918213,
      type: 'pickup',
      piece: 'cone',
      location: 'doubleSub',
      isAuto: false,
    },
    { timestamp: 74.48600006103516, type: 'score', piece: 'cube', row: 0, col: 1, isAuto: false },
    {
      timestamp: 87.77300000190735,
      type: 'pickup',
      piece: 'empty',
      location: 'singleSub',
      isAuto: false,
    },
    { timestamp: 100.99399995803833, type: 'score', piece: 'cone', row: 0, col: 2, isAuto: false },
    {
      timestamp: 122.62299990653992,
      type: 'pickup',
      piece: 'cone',
      location: 'floor',
      isAuto: false,
    },
    { timestamp: 135.33699989318848, type: 'score', piece: 'cube', row: 2, col: 1, isAuto: false },
    {
      timestamp: 138.38700008392334,
      type: 'pickup',
      piece: 'cone',
      location: 'floor',
      isAuto: false,
    },
    { timestamp: 140.62400007247925, type: 'drop', piece: 'cube', isAuto: false },
    { timestamp: 147.84100008010864, type: 'auto', hasMobility: false, location: 'None' },
    {
      timestamp: 178.04999995231628,
      type: 'endgame',
      location: 'Engaged',
      notes: 'No movement in auto',
    },
  ],
};

export const MatchLogs: React.FC<TMatchLogsProps> = ({ navigation }) => {
  const [fileInfo, setFileInfo] = useState('');

  const handleFiles = async () => {
    try {
      const logs = `${fs.DocumentDirectoryPath}/logs`;
      const unzippedPath = `${logs}/unzipped`;
      const zippedPath = `${logs}/zipped`;

      await fs.mkdir(logs);
      await fs.mkdir(unzippedPath);
      await fs.mkdir(zippedPath);

      await fs.writeFile(`${unzippedPath}/test.txt`, JSON.stringify(sampleMatch));

      const unzippedFiles = (await fs.readDir(unzippedPath)).map((elem) => elem.name).join('\n');
      console.log(unzippedFiles);

      await zip([`${unzippedPath}/test.txt`], `${zippedPath}/test.zip`);

      const zippedFiles = (await fs.readDir(zippedPath)).map((elem) => elem.name).join('\n');
      console.log(zippedFiles);
    } catch (err) {
      console.log('err');
      console.log(JSON.stringify(err));
    }
  };

  useEffect(() => {
    handleFiles();
  }, []);

  return (
    <Box>
      <Text>{fileInfo}</Text>
      <Button
        title="Startup"
        variant="contained"
        onPress={() => {
          navigation.navigate('Startup');
        }}
      />
    </Box>
  );
};
