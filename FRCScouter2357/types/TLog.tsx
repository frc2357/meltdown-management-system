import { TEvent } from "./TEvent";

export type TLog = {
  teamNum: number;
  scouter: string;
  matchNum: number;
  alliance: 'RED' | 'BLUE';
  alliancePos: '1' | '2' | '3';
  events: TEvent[];
};