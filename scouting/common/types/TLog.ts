import { TAssignmentBase } from '.';
import { TEvent } from '.';

export type TLog = {
  teamNum: number;
  matchNum: number;
  events: TEvent[];
  scouter: string;
} & TAssignmentBase;
