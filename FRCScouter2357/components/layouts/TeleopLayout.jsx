import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogHeader,
  HStack,
  Switch,
  Text,
  VStack,
} from '@react-native-material/core';
import { Image, Dimensions, StyleSheet } from 'react-native';

const windowDimensions = Dimensions.get('window');

export default () => {
  const [autoVisible, setAutoVisible] = useState(false);
  const [hasMobility, setMobility] = useState(false);

  return (
    <Box>
      <Dialog visible={autoVisible} onDismiss={() => setAutoVisible(false)}>
        <DialogHeader title="Auto" />
        <DialogContent>
          <VStack>
            <HStack>
              <Switch value={hasMobility} onValueChange={() => setMobility(!hasMobility)} />
              <Text>Mobility</Text>
            </HStack>
            <HStack>
              <Button></Button>
              <Text>Engaged</Text>
            </HStack>
            <HStack>
              <Button></Button>
              <Text>Docked</Text>
            </HStack>
          </VStack>
        </DialogContent>
        <DialogActions>
          <Button title="Cancel" compact variant="text" onPress={() => setAutoVisible(false)} />
          <Button title="Ok" compact variant="text" onPress={() => setAutoVisible(false)} />
        </DialogActions>
      </Dialog>
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
    width: windowDimensions.width * (2 / 3),
    height: windowDimensions.height - 65,
  },
  doubleSub: {
    width: windowDimensions.width * (1 / 3),
    height: windowDimensions.height / 2 - 32.5,
  },
  floor: {
    width: windowDimensions.width * (0.5 / 3),
    height: windowDimensions.height / 2 - 32.5,
  },
  singleSub: {
    width: windowDimensions.width * (0.5 / 3),
    height: windowDimensions.height / 2 - 32.5,
  },
});
