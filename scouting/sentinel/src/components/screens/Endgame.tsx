import React, { useState } from 'react';
import {
  VStack,
  TextInput,
  HStack,
  Text,
  Button,
  Box,
  Divider,
  Spacer,
} from '@react-native-material/core';
import { StyleSheet, Dimensions } from 'react-native';
import { RadioButtonList } from '../basics/RadioButtonList';
import { EAssignmentActionType, TRootStackParamList } from '../../../types';
import { EEndgameLocation2025 } from '../../../../common/types/2025';
import { RadioButton } from 'react-native-paper';
import { useLog, useSaveLog } from '../../contexts/LogContext';
import { useAssignmentDispatch } from '../../contexts/AssignmentContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const windowDimensions = Dimensions.get('window');

export type PEndgameScreenProps = NativeStackScreenProps<TRootStackParamList, 'Endgame'>;

export function Endgame({ navigation }: PEndgameScreenProps): React.JSX.Element {
  const [endgameLocation, setEndgameLocation] = useState<EEndgameLocation2025>(
    EEndgameLocation2025.none
  );
  const [spotlit, setSpotlit] = useState<'checked' | 'unchecked'>('unchecked');
  const [harmony, setHarmony] = useState<'checked' | 'unchecked'>('unchecked');
  const [trap, setTrap] = useState<number>(0);
  const [notes, setNotes] = useState('');

  const log = useLog();
  const saveLog = useSaveLog();

  const assignmentDispatch = useAssignmentDispatch();

  const onSubmit = () => {
    log.addEndgameEvent(
      endgameLocation,
      `\"${notes}\"`,
      true, // TODO: Implement algae
    );

    assignmentDispatch({
      type: EAssignmentActionType.nextMatch,
    });

    saveLog().then((path) => {
      navigation.navigate('QRShow', { routeName: 'Prematch', path });
    });
  };

  return (
    <Box style={styles.autoContainer}>
      <Text variant="h4">Endgame</Text>
      <VStack>
        <Text variant="h6">Stage:</Text>
        <RadioButtonList
          labels={Object.values(EEndgameLocation2025)}
          direction="row"
          selected={endgameLocation}
          setSelected={(value: EEndgameLocation2025) => {
            setEndgameLocation(value);
          }}
        />
        <Divider />
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
    height: 180,
    margin: 4,
    width: 400,
  },
});
