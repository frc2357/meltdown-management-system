import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Text, Button, VStack } from '@react-native-material/core';
import AwaitMatchScreen from './AwaitMatchScreen';

export default function PrematchScreen({ navigation }) {
  const assignment = useSelector((state) => state.bluetooth.assignment);
  const match = useSelector((state) => state.bluetooth.currentMatch);

  const scouter = assignment?.scouter ? assignment.scouter : '';
  const id = assignment?.id ? assignment.id : '';

  const teamNum = match?.teamNum ? assignment.teamNum : '';
  const matchNum = match?.matchNum ? assignment.matchNum : '';

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
       </VStack>

       <Button title="Confirm" variant="contained" onPress={()=> navigation.navigate("TeleopLayout")}></Button>
    </Box>
  );
}
