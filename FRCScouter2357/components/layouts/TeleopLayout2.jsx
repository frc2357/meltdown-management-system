import React, { useState } from 'react';
import { Box, Button, HStack, VStack } from '@react-native-material/core';
import { Image, Dimensions, StyleSheet } from 'react-native';
import AutoDialog from '../screens/AutoScreen';

const windowDimensions = Dimensions.get('window');

export default function TeleopLayout() {
  const [autoVisible, setAutoVisible] = useState(false);

  return (
    <Box>
      <AutoDialog visible={autoVisible} setVisible={setAutoVisible} />
      <HStack spacing={6} style={styles.buttonStack}>
        <Button variant="contained" title="Auto" onPress={() => setAutoVisible(true)} />
        <Button variant="contained" title="Drop" />
        <Button variant="contained" title="Endgame" />
      </HStack>
      <HStack>
        <Image alt="Columns" source={require('../../images/grid.png')} style={styles.columns} />
        <VStack>
          <Image
            alt="double substation"
            source={require('../../images/doubleSub.png')}
            style={styles.doubleSub}
          />
          <HStack>
            <Image
              alt="floor intake"
              source={require('../../images/floor.png')}
              style={styles.floor}
            />
            <Image
              alt="Single substation"
              source={require('../../images/singleSub.png')}
              style={styles.singleSub}
            />
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  buttonStack: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
  },
  columns: {
    height: windowDimensions.height - 65,
    width: windowDimensions.width * (2 / 3),
  },
  doubleSub: {
    height: windowDimensions.height / 2 - 32.5,
    width: windowDimensions.width * (1 / 3),
  },
  floor: {
    height: windowDimensions.height / 2 - 32.5,
    width: windowDimensions.width * (0.5 / 3),
  },
  singleSub: {
    height: windowDimensions.height / 2 - 32.5,
    width: windowDimensions.width * (0.5 / 3),
  },
});
