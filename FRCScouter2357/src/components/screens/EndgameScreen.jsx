import React from 'react';
import { VStack, TextInput, HStack, Text, Button, Box } from '@react-native-material/core';
import { StyleSheet, Dimensions } from 'react-native';
import RadioButtonList from '../basics/RadioButtonList';

const windowDimensions = Dimensions.get('window');

export default function EndgameScreen({ navigation }) {
  return (
    <Box style={styles.autoContainer}>
      <Text title="Auto" />
      <VStack>
        <RadioButtonList labels={['Parked', 'Docked', 'Engaged']} direction="row" />
        <TextInput
          label="Notes"
          variant="outlined"
          multiline={true}
          numberOfLines={20}
          textAlignVertical={'top'}
          style={styles.textInput}
        ></TextInput>
      </VStack>

      <HStack>
        <Button
          title="Cancel"
          compact
          variant="outlined"
          onPress={() => navigation.navigate('TeleopLayout')}
        />
        <Button
          title="Submit"
          compact
          variant="contained"
          onPress={() => navigation.navigate('PrematchScreen')}
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
  textInput: {
    height: 300,
    margin: 4,
    width: 400,
  },
});
