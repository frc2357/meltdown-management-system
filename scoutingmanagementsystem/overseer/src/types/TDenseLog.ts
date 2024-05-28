import { TDenseEvent } from '.';

export type TDenseLog = {
  t: number; // teamNum
  m: number; // matchNum
  e: TDenseEvent[]; // events
  s: string; // scouter
  a: string; // alliance
  p: string; // alliancePos
};
