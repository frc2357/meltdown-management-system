import React from 'react';
import { Box, Button, HStack, VStack } from '@react-native-material/core';
import { Image, Dimensions, StyleSheet } from 'react-native';

const windowDimensions = Dimensions.get('window');

export default () => {
  return (
    <Box>
      <HStack spacing={6} style={styles.buttonStack}>
        <Button variant="contained" title="Auto" />
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
    width: windowDimensions.width * (2 / 3),
    height: windowDimensions.height - 65,
  },
  doubleSub: {
    width: windowDimensions.width * (1 / 3),
    height: (windowDimensions.height / 2) - 32.5,
  },
  floor: {
    width: windowDimensions.width * (0.5 / 3),
    height: (windowDimensions.height / 2) - 32.5,
  },
  singleSub: {
    width: windowDimensions.width * (0.5 / 3),
    height: (windowDimensions.height / 2) - 32.5,
  },
});
