import { TAssignmentBase } from '.';

export type TLog<event> = {
  teamNum: number;
  matchNum: number;
  events: Partial<event>[];
  scouter: string;
} & TAssignmentBase;
