import React from 'react';
import { TAssignmentMatch } from '../../../types';
import { useAssignment } from '../../contexts/AssignmentContext';
import { DataTable } from 'react-native-paper';
import { Text } from '@react-native-material/core';
import { StyleSheet } from 'react-native';

export const AssignmentTable: React.FC = () => {
  const assignment = useAssignment();
  const currentMatch: TAssignmentMatch = assignment.matches.find(
    (x: TAssignmentMatch) => x.matchNum === assignment.currentMatch
  );

  const scouterName = assignment?.scouter ? assignment.scouter : '';

  const teamNum = currentMatch.teamNum;
  const matchNum = currentMatch.matchNum;
  const alliance = assignment.alliance;

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
