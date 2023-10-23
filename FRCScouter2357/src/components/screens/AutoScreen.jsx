import React, { useState } from 'react';
import { VStack, HStack, Text, Button, Box, Switch } from '@react-native-material/core';
import { StyleSheet, Dimensions } from 'react-native';
import RadioButtonList from '../basics/RadioButtonList';
import { useDispatch } from 'react-redux';
import { addEvent } from '../../state/matchLogSlice';
import { Checkbox } from 'react-native-paper';
import useEventCreator from '../../hooks/useEventCreator';

const windowDimensions = Dimensions.get('window');

export default function AutoScreen({ navigation }) {
  const [hasMobility, setMobility] = useState(false);
  const [chargestation, setChargestation] = useState('None');
  const eventCreator = useEventCreator();
  const dispatch = useDispatch();

  const onOk = () => {
    dispatch(addEvent(eventCreator.createAuto(hasMobility, chargestation)));

    navigation.navigate('TeleopLayout');
  };

  return (
    <Box style={styles.autoContainer}>
      <Text variant="h4">Auto</Text>
      <VStack>
        <HStack>
          <Switch value={hasMobility} onValueChange={() => setMobility(!hasMobility)} />
          <Text>Mobility</Text>
        </HStack>
        <HStack>
          <Text variant="h6">Chargestation:</Text>
          <RadioButtonList
            labels={['Docked', 'Engaged', 'None']}
            selected={chargestation}
            position="leading"
            setSelected={setChargestation}
          />
        </HStack>
      </VStack>
      <HStack>
        <Button
          title="Cancel"
          variant="outlined"
          onPress={() => navigation.navigate('TeleopLayout', { isAuto: false })}
          style={styles.button}
        />
        <Button title="Ok" variant="contained" onPress={onOk} style={styles.button} />
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
  button: {
    margin: 20,
    width: 100,
  },
});
