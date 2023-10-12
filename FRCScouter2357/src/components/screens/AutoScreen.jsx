import React, { useState } from 'react';
import { VStack, HStack, Switch, Text, Button, Box } from '@react-native-material/core';
import { StyleSheet, Dimensions } from 'react-native';
import RadioButtonList from '../basics/RadioButtonList';
import { useDispatch } from 'react-redux';
import { addEvent } from '../../state/matchLogSlice';
import { createAuto } from '../../util/eventCreator';

const windowDimensions = Dimensions.get('window');

export default function AutoScreen({ navigation }) {
  const [hasMobility, setMobility] = useState(false);
  const [chargestation, setChargestation] = useState('None');
  const dispatch = useDispatch();

  const onOk = () => {
    dispatch(addEvent(createAuto(hasMobility, chargestation)));

    navigation.navigate('TeleopLayout');
  };

  return (
    <Box style={styles.autoContainer}>
      <Text title="Auto" />
      <VStack>
        <HStack>
          <Switch value={hasMobility} onValueChange={() => setMobility(!hasMobility)} />
          <Text>Mobility</Text>
        </HStack>
        <RadioButtonList
          labels={['Docked', 'Engaged', 'None']}
          selected={chargestation}
          setSelected={setChargestation}
        />
      </VStack>
      <HStack>
        <Button
          title="Cancel"
          compact
          variant="outlined"
          onPress={() => navigation.navigate('TeleopLayout', { isAuto: false })}
        />
        <Button title="Ok" compact variant="contained" onPress={onOk} />
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
