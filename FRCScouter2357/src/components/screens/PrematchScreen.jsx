import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Text, Button, VStack, Pressable } from '@react-native-material/core';
import { Image, StyleSheet } from 'react-native';
import AwaitMatchScreen from './AwaitMatchScreen';

export default function PrematchScreen({ navigation }) {
  const [pressed, setPressed] = useState(new Array(4).fill(false));
  const assignment = useSelector((state) => state.bluetooth.assignment);
  const match = useSelector((state) => state.bluetooth.currentMatch);

  const scouter = assignment?.scouter ? assignment.scouter : '';
  const id = assignment?.id ? assignment.id : '';

  const teamNum = match?.teamNum ? assignment.teamNum : '';
  const matchNum = match?.matchNum ? assignment.matchNum : '';
  const alliance = match?.alliancePos ? assignment.alliancePos : '';

  if (!match) {
    return <AwaitMatchScreen />;
  }

  return (
    <Box>
      <Text variant="h2">Pre-Match</Text>
      <VStack m={4} spacing={1} divider={true}>
        <Text variant="p">Scouter: {scouter}</Text>
        <Text variant="p">ID: {id}</Text>
        <Text variant="p">Team #: {teamNum}</Text>
        <Text variant="p">Match #: {matchNum}</Text>
        <Text variant="p">Alliance #: {alliance}</Text>
        <></>
      </VStack>
      <Text variant="h5">Press start location:</Text>
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
            style={{ ...style, backgroundColor: pressed[i] ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0)' }}
            onPress={() => {
              const newArr = new Array(4).fill(false);
              newArr[i] = true;
              setPressed(newArr);
            }}
          />
        );
      })}
      <Button
        title="Confirm"
        variant="contained"
        style={styles.confirm}
        onPress={() => navigation.navigate('TeleopLayout')}
      />
    </Box>
  );
}

const center = 1024 / 2;
const communityLeft = center - 225;
const styles = StyleSheet.create({
  community: {
    height: 300,
    left: communityLeft,
    position: 'absolute',
    top: 180,
    width: 450,
  },
  confirm: {
    left: communityLeft,
    position: 'absolute',
    top: 485,
    width: 450,
  },
  posFour: {
    height: 130,
    left: communityLeft + 122 + 210,
    position: 'absolute',
    top: 190 + 150,
    width: 118,
  },
  posOne: {
    height: 150,
    left: communityLeft + 17,
    position: 'absolute',
    top: 190,
    width: 105,
  },
  posThree: {
    height: 150,
    left: communityLeft + 122 + 210,
    position: 'absolute',
    top: 190,
    width: 118,
  },
  posTwo: {
    height: 120,
    left: communityLeft + 122,
    position: 'absolute',
    top: 190,
    width: 210,
  },
});
const posStyles = [styles.posOne, styles.posTwo, styles.posThree, styles.posFour];
