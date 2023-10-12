import React, { useState } from 'react';
import { VStack, TextInput, HStack, Text, Button, Box } from '@react-native-material/core';
import { StyleSheet, Dimensions } from 'react-native';
import RadioButtonList from '../basics/RadioButtonList';
import { useDispatch } from 'react-redux';
import { addEndgame } from '../../state/matchLogSlice';

const windowDimensions = Dimensions.get('window');

export default function EndgameScreen({ navigation }) {
  const [chargestation, setChargestation] = useState('None');
  const [notes, setNotes] = useState('');
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(addEndgame({ loc: chargestation }));

    navigation.navigate('PrematchScreen');
  };

  return (
    <Box style={styles.autoContainer}>
      <Text title="Auto" />
      <VStack>
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
        />
        <Button title="Submit" compact variant="contained" onPress={onSubmit} />
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
  textInput: {
    height: 300,
    margin: 4,
    width: 400,
  },
});
