import { TAssignmentMatch } from './TAssignmentMatch';

export type TAssignment = {
  scouter: string;
  alliance: 'RED' | 'BLUE' | '';
  alliancePos: '1' | '2' | '3' | '';
  currentMatch: number;
  matches: TAssignmentMatch[];
};
