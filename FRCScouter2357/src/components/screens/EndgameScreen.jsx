import React, { useState } from 'react';
import { VStack, TextInput, HStack, Text, Button, Box } from '@react-native-material/core';
import { StyleSheet, Dimensions, DeviceEventEmitter } from 'react-native';
import RadioButtonList from '../basics/RadioButtonList';
import { addEvent } from '../../state/matchLogSlice';
import useEventCreator from '../../hooks/useEventCreator';

const windowDimensions = Dimensions.get('window');

export default function EndgameScreen({ navigation }) {
  const [chargestation, setChargestation] = useState('None');
  const [notes, setNotes] = useState('');
  const eventCreator = useEventCreator();

  const onSubmit = () => {
    DeviceEventEmitter.emit('event.uploadMatch');
    navigation.navigate('PrematchScreen');
  };

  return (
    <Box style={styles.autoContainer}>
      <Text variant="h4">Endgame</Text>
      <VStack>
        <Text variant="h6">Chargestation:</Text>
        <RadioButtonList
          labels={['Parked', 'Docked', 'Engaged', 'None']}
          direction="row"
          selected={chargestation}
          setSelected={setChargestation}
        />
        <TextInput
          label="Notes"
          variant="outlined"
          multiline={true}
          numberOfLines={20}
          textAlignVertical={'top'}
          style={styles.textInput}
          onChangeText={setNotes}
          value={notes}
        />
      </VStack>

      <HStack>
        <Button
          title="Cancel"
          compact
          variant="outlined"
          onPress={() => navigation.navigate('TeleopLayout')}
          style={styles.button}
        />
        <Button
          title="Submit"
          compact
          variant="contained"
          onPress={onSubmit}
          style={styles.button}
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
  button: {
    margin: 20,
    width: 100,
  },
  textInput: {
    height: 300,
    margin: 4,
    width: 400,
  },
});
