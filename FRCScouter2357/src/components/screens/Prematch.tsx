import React, { useState } from 'react';
import { Box, Text, Button, Pressable, HStack } from '@react-native-material/core';
import { Image, StyleSheet } from 'react-native';
import { RadioButtonList } from '../basics/RadioButtonList';
import { ERobotStates } from '../../../types';
import { useEventCreator } from '../../hooks/useEventCreator';
import { TPrematchScreenProps } from '../../../types';
import autoFieldImage from '../../../assets/autoField.png';
import {AssignmentTable} from '../tables/AssignmentTable';
const startPosLabels = ['open lane', 'charge station', 'cable bump', 'outside community'];

export const Prematch: React.FC<TPrematchScreenProps> = ({ navigation }) => {
  const [startPosPressed, setStartPosPressed] = useState(
    new Array(startPosLabels.length).fill(false)
  );
  const [preload, setPreload] = useState(ERobotStates.empty);
  const eventCreator = useEventCreator();

  const onConfirm = () => {
    let startPos = '';
    for (let i = 0; i < startPosLabels.length; i++) {
      if (startPosPressed[i]) {
        startPos = startPosLabels[i];
      }
    }

    setStartPosPressed(new Array(startPosLabels.length).fill(false));
    setPreload(ERobotStates.empty);

    navigation.navigate('TeleopLayout', { initialRobotState: preload, isAuto: true });
  };

  return (
    <Box>
      <Text variant="h4">Pre-Match</Text>
      <HStack spacing={2}>
        <AssignmentTable/>
        <Box style={styles.form}>
          <Text variant="h6">Pre-Load:</Text>
          <RadioButtonList
            direction="row"
            labels={[ERobotStates.note, ERobotStates.empty]}
            selected={preload}
            setSelected={(value: ERobotStates) => setPreload(value)}
          />
          <Text variant="h5">Press start location:</Text>
        </Box>
      </HStack>
      <Image alt="Starting position" source={autoFieldImage} style={styles.autoField} />

      {posStyles.map((style, i) => {
        return (
          <Pressable
            key={i}
            // eslint-disable-next-line react-native/no-color-literals, react-native/no-inline-styles
            style={{
              ...style,
              backgroundColor: startPosPressed[i] ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0)',
            }}
            onPress={() => {
              const newArr = new Array(4).fill(false);
              newArr[i] = true;
              setStartPosPressed(newArr);
            }}
          />
        );
      })}
      <Button title="Confirm" variant="contained" style={styles.confirm} onPress={onConfirm} />
    </Box>
  );
};

const communityLeft = 12;
const communityTop = 280;
const styles = StyleSheet.create({
  autoField: {
    height: 225,
    left: communityLeft,
    position: 'absolute',
    top: communityTop,
    width: 1000,
  },
  confirm: {
    left: 562,
    position: 'absolute',
    top: 510,
    width: 450,
  },
  form: {
    marginLeft: 150,
    marginTop: 120,
  },
  posFour: {
    height: 225,
    left: communityLeft + 220 + 185 + 220,
    position: 'absolute',
    top: communityTop,
    width: 375,
  },
  posOne: {
    height: 225,
    left: communityLeft,
    position: 'absolute',
    top: communityTop,
    width: 220,
  },
  posThree: {
    height: 225,
    left: communityLeft + 220 + 185,
    position: 'absolute',
    top: communityTop,
    width: 220,
  },
  posTwo: {
    height: 120,
    left: communityLeft + 220,
    position: 'absolute',
    top: communityTop,
    width: 185,
  },
});
const posStyles = [styles.posOne, styles.posTwo, styles.posThree, styles.posFour];
