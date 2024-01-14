import { TAssignmentMatch } from './TAssignmentMatch';

export type TAssignment = {
  scouter: string;
  alliance: string;
  currentMatch: number;
  matches: TAssignmentMatch[];
};
