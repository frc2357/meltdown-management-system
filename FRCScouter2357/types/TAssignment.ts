import { TAssignmentBase } from './TAssignmentBase';
import { TAssignmentMatch } from './TAssignmentMatch';

export type TAssignment = {
  currentMatch: number;
  matches: TAssignmentMatch[];
} & TAssignmentBase;
