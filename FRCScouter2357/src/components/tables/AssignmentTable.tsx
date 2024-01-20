import React, { useState } from 'react';
import { TAssignment, TAssignmentMatch } from '../../../types';
import { useAssignment } from '../../contexts/AssignmentContext';
import { DataTable } from 'react-native-paper';
import { Text } from '@react-native-material/core';
import { StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export const AssignmentTable: React.FC = () => {
  const [currentMatchNum, setCurrentMatchNum] = useState<number>(-1);

  const assignment: TAssignment = useAssignment();
  const currentMatch: TAssignmentMatch | undefined = assignment.matches.find(
    (x: TAssignmentMatch) => x.matchNum === assignment.currentMatch
  );

  const scouterName: string = currentMatch?.scouter ?? '';
  const teamNum: number = currentMatch?.teamNum ?? 0;
  const matchNum: number = assignment.currentMatch;
  const alliance: string = `${assignment.alliance} ${assignment.alliancePos}`;

  useFocusEffect(
    React.useCallback(() => {
      setCurrentMatchNum(assignment.currentMatch);
    }, [assignment.currentMatch])
  );

  return (
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
          <Text>Alliance Pos</Text>
        </DataTable.Title>
        <DataTable.Cell>
          <Text>{alliance}</Text>
        </DataTable.Cell>
      </DataTable.Row>
    </DataTable>
  );
};

const styles = StyleSheet.create({
  dataTable: {
    width: 400,
  },
});
