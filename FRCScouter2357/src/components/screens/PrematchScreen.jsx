import React, { useState } from 'react';
import { Box, Text, Button, Pressable, HStack } from '@react-native-material/core';
import { Image, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import RadioButtonList from '../basics/RadioButtonList';
import { addEvent, newMatch } from '../../state/matchLogSlice';
import robotStates from '../../util/robotStates';
import useEventCreator from '../../hooks/useEventCreator';

const startPosLabels = ['open lane', 'charge station', 'cable bump', 'outside community'];

export default function PrematchScreen({ navigation }) {
  const [startPosPressed, setStartPosPressed] = useState(
    new Array(startPosLabels.length).fill(false)
  );
  const [preload, setPreload] = useState(robotStates.empty);
  const eventCreator = useEventCreator();

  const scouterName = assignment?.scouter ? assignment.scouter : '';
  const id = assignment?.id ? assignment.id : '';

  const teamNum = match?.teamNum ? match.teamNum : '';
  const matchNum = match?.matchNum ? match.matchNum : 0;
  const alliance = match?.alliance ? match.alliance : '';
  const alliancePos = match?.alliancePos ? match.alliancePos : '';

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
      <HStack>
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
              <Text>ID</Text>
            </DataTable.Title>
            <DataTable.Cell>
              <Text>{id}</Text>
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
            labels={[robotStates.cone, robotStates.cube, robotStates.empty]}
            selected={preload}
            setSelected={setPreload}
          />
          <Text variant="h5">Press start location:</Text>
        </Box>
      </HStack>
      <Image
        alt="Starting position"
        source={require('../../images/community.png')}
        style={styles.community}
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

const communityLeft = 550;
const communityTop = 170;
const styles = StyleSheet.create({
  community: {
    height: 300,
    left: communityLeft,
    position: 'absolute',
    top: communityTop,
    width: 450,
  },
  confirm: {
    left: communityLeft,
    position: 'absolute',
    top: 480,
    width: 450,
  },
  dataTable: {
    width: 400,
  },
  form: {
    marginLeft: 150,
  },
  posFour: {
    height: 130,
    left: communityLeft + 122 + 210,
    position: 'absolute',
    top: communityTop + 10 + 150,
    width: 118,
  },
  posOne: {
    height: 150,
    left: communityLeft + 17,
    position: 'absolute',
    top: communityTop + 10,
    width: 105,
  },
  posThree: {
    height: 150,
    left: communityLeft + 122 + 210,
    position: 'absolute',
    top: communityTop + 10,
    width: 118,
  },
  posTwo: {
    height: 120,
    left: communityLeft + 122,
    position: 'absolute',
    top: communityTop + 10,
    width: 210,
  },
});
const posStyles = [styles.posOne, styles.posTwo, styles.posThree, styles.posFour];
