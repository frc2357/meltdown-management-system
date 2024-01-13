import React, { useEffect, useState } from 'react';
import { Box, Button, Text } from '@react-native-material/core';
import fs from 'react-native-fs';

export const MatchLogs = ({ navigation }) => {
  const [ fileInfo, setFileInfo ] = useState('');

  useEffect(() => {
    fs.readDir(fs.DocumentDirectoryPath).then((result) => {
      setFileInfo(JSON.stringify(result));
    });
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
