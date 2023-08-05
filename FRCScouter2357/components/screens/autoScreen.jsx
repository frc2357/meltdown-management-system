import React, { useState } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  VStack,
  HStack,
  Switch,
  Text,
  Button
} from '@react-native-material/core';
import { StyleSheet, Dimensions } from 'react-native';

const windowDimensions = Dimensions.get('window');

export default function autoScreen() {
  const [hasMobility, setMobility] = useState(false);
  const [visible, setVisible] = useState(false);

  return (
    <Dialog style={styles.dialog} visible={visible} onDismiss={() => setVisible(false)}>
      <DialogHeader title="Auto" />
      <DialogContent>
        <VStack>
          <HStack>
            <Switch value={hasMobility} onValueChange={() => setMobility(!hasMobility)} />
            <Text>Mobility and some really long text</Text>
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
        <Button title="Cancel" compact variant="text" onPress={() => setVisible(false)} />
        <Button title="Ok" compact variant="text" onPress={() => setVisible(false)} />
      </DialogActions>
    </Dialog>
  );
};

const styles = StyleSheet.create({
    dialog: {
      height: windowDimensions.height,
      width: windowDimensions.width,
    },  
})  