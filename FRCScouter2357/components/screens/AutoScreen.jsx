import React, { useState } from 'react';
import { VStack, HStack, Switch, Text, Button, Box } from '@react-native-material/core';
import { StyleSheet, Dimensions } from 'react-native';

const windowDimensions = Dimensions.get('window');

export default function AutoScreen({ navigation }) {
  const [hasMobility, setMobility] = useState(false);

  return (
    <Box style={styles.autoContainer}>
      <Text title="Auto" />
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
      <Button title="Cancel" compact variant="text" onPress={() => navigation.navigate('TeleopLayout')} />
      <Button title="Ok" compact variant="text" onPress={() => navigation.navigate('TeleopLayout')} />
    </Box>
  );
}

const styles = StyleSheet.create({
  autoContainer: {
    height: windowDimensions.height,
    width: windowDimensions.width,
  },
});
