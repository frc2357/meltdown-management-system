import { TAssignmentBase } from './TAssignmentBase';
import { TAssignmentMatch } from './TAssignmentMatch';

export type TAssignment = {
  currentMatch: number;
  event: string;
  matches: TAssignmentMatch[];
} & TAssignmentBase;
