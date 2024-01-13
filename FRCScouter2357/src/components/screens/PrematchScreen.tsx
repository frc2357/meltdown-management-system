import React, { useContext, useState } from 'react';
import { Box, Text, Button, Pressable, HStack, VStack } from '@react-native-material/core';
import { Image, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import RadioButtonList from '../basics/RadioButtonList';
import robotStates from '../../../types/ERobotStates';
import useEventCreator from '../../hooks/useEventCreator';
import { AssignmentContext } from '../../contexts/AssignmentContext';

const startPosLabels = ['open lane', 'charge station', 'cable bump', 'outside community'];

export type TPrematchScreenProps = {}

export const PrematchScreen: React.FC<TPrematchScreenProps> = ({ navigation }) => {
  const [startPosPressed, setStartPosPressed] = useState(
    new Array(startPosLabels.length).fill(false)
  );
  const [preload, setPreload] = useState(robotStates.empty);
  const eventCreator = useEventCreator();

  const assignment = useContext(AssignmentContext);

  const scouterName = assignment?.scouter ? assignment.scouter : '';

  const teamNum = assignment?.teamNum ?? '';
  const matchNum = assignment?.matchNum ?? 0;
  const alliance = assignment?.alliance ?? '';
  const alliancePos = assignment?.alliancePos ?? '';

  const onConfirm = () => {
    let startPos = '';
    for (let i = 0; i < startPosLabels.length; i++) {
      if (startPosPressed[i]) {
        startPos = startPosLabels[i];
      }
    }

    setStartPosPressed(new Array(startPosLabels.length).fill(false));
    setPreload(robotStates.empty);

    navigation.navigate('TeleopLayout', { initialRobotState: preload, isAuto: true });
  };

  return (
    <Box>
      <Text variant="h4">Pre-Match</Text>
      <HStack spacing={2}>
        <DataTable style={styles.dataTable}>
          <DataTable.Row>
            <DataTable.Title>
              <Text>Scouter</Text>
            </DataTable.Title>
            <DataTable.Cell>
              <Text>{scouterName}</Text>
            </DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Title>
              <Text>Team #</Text>
            </DataTable.Title>
            <DataTable.Cell>
              <Text>{teamNum}</Text>
            </DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Title>
              <Text>Match #</Text>
            </DataTable.Title>
            <DataTable.Cell>
              <Text>{matchNum}</Text>
            </DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Title>
              <Text>Alliance</Text>
            </DataTable.Title>
            <DataTable.Cell>
              <Text>{alliance}</Text>
            </DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Title>
              <Text>Alliance Pos</Text>
            </DataTable.Title>
            <DataTable.Cell>
              <Text>{alliancePos}</Text>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
        <Box style={styles.form}>
          <Text variant="h6">Pre-Load:</Text>
          <RadioButtonList
            direction="row"
            labels={[robotStates.note, robotStates.empty]}
            selected={preload}
            setSelected={setPreload}
          />
          <Text variant="h5">Press start location:</Text>
        </Box>
      </HStack>
      <Image
        alt="Starting position"
        source={require('../../images/autoField.png')}
        style={styles.autoField}
      />

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
}

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
  dataTable: {
    width: 400,
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
