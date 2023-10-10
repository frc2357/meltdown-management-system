import React, { useState } from 'react';
import { VStack, HStack, Switch, Text, Button, Box } from '@react-native-material/core';
import { StyleSheet, Dimensions } from 'react-native';
import RadioButtonList from '../basics/RadioButtonList';

const windowDimensions = Dimensions.get('window');

export default function AutoScreen({ navigation }) {
  const [hasMobility, setMobility] = useState(false);

  return (
    <Box style={styles.autoContainer}>
      <Text title="Auto" />
      <VStack>
        <HStack>
          <Switch value={hasMobility} onValueChange={() => setMobility(!hasMobility)} />
          <Text>Mobility</Text>
        </HStack>
        <RadioButtonList labels={['None','Docked', 'Engaged', 'None']} />
      </VStack>
      <HStack>
        <Button
          title="Cancel"
          compact
          variant="outlined"
          onPress={() => navigation.navigate('TeleopLayout')}
        />
        <Button
          title="Ok"
          compact
          variant="contained"
          onPress={() => navigation.navigate('TeleopLayout')}
        />
      </HStack>
    </Box>
  );
}

const styles = StyleSheet.create({
  autoContainer: {
    alignContent: 'center',
    alignItems: 'center',
    height: windowDimensions.height,
    width: windowDimensions.width,
  },
});
