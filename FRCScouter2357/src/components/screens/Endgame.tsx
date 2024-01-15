import React, { useState } from 'react';
import { VStack, TextInput, HStack, Text, Button, Box } from '@react-native-material/core';
import { StyleSheet, Dimensions, DeviceEventEmitter } from 'react-native';
import { RadioButtonList } from '../basics/RadioButtonList';
import { useEventCreator } from '../../hooks/useEventCreator';
import { EEndgameLocation, TEndgameScreenProps } from '../../../types';
import { RadioButton } from 'react-native-paper';

const windowDimensions = Dimensions.get('window');

export const Endgame: React.FC<TEndgameScreenProps> = ({ navigation }) => {
  const [endgameLocation, setEndgameLocation] = useState<EEndgameLocation>(EEndgameLocation.none);
  const [spotlit, setSpotlit] = useState<'checked' | 'unchecked'>('unchecked');
  const [harmony, setHarmony] = useState<'checked' | 'unchecked'>('unchecked');
  const [trap, setTrap] = useState<'checked' | 'unchecked'>('unchecked');

  const [notes, setNotes] = useState('');
  const eventCreator = useEventCreator();

  const onSubmit = () => {
    DeviceEventEmitter.emit('event.uploadMatch');
    navigation.navigate('QRShow');
  };

  return (
    <Box style={styles.autoContainer}>
      <Text variant="h4">Endgame</Text>
      <VStack>
        <Text variant="h6">Stage:</Text>
        <RadioButtonList
          labels={Object.values(EEndgameLocation)}
          direction="row"
          selected={endgameLocation}
          setSelected={(value: EEndgameLocation) => {
            setEndgameLocation(value);
          }}
        />
        <RadioButton.Item
          label="Spotlit"
          value="Spotlit"
          status={spotlit}
          onPress={() => {
            setSpotlit(spotlit === 'unchecked' ? 'checked' : 'unchecked');
          }}
        />
        <RadioButton.Item
          label="Harmony"
          value="Harmony"
          status={harmony}
          onPress={() => {
            setSpotlit(harmony === 'unchecked' ? 'checked' : 'unchecked');
          }}
        />
        <RadioButton.Item
          label="Trap"
          value="Trap"
          status={trap}
          onPress={() => {
            setTrap(trap === 'unchecked' ? 'checked' : 'unchecked');
          }}
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
};

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
    height: 180,
    margin: 4,
    width: 400,
  },
});
