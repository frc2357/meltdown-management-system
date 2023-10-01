import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Text } from '@react-native-material/core';

export default function PrematchScreen({ navigation }) {
  const assignment = useSelector((state) => state.bluetooth.assignment);
  const match = useSelector((state) => state.bluetooth.currentMatch);

  return (
    <Box>
      <Text variant="h1">Pre-Match</Text>
      <table>
        <tr>
          <th>
            <Text variant="p">Scouter</Text>
          </th>
          <th>
            <Text variant="p">ID</Text>
          </th>
          <th>
            <Text variant="p">Team</Text>
          </th>
          <th>
            <Text variant="p">match #</Text>
          </th>
        </tr>
        <tr>
          <td>
            <Text variant="p">{assignment.scouter}</Text>
          </td>

          <td>
            <Text variant="p">{assignment.id}</Text>
          </td>

          <td>
            <Text variant="p">{match.teamNum}</Text>
          </td>
          <td>
            <Text variant="p">{match.matchNum}</Text>
          </td>
        </tr>
      </table>
    </Box>
  );
}
