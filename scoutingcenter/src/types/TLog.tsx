import { TEvent } from './TEvent';

export type TLog = {
  teamNum: number;
  matchNum: number;
  events: TEvent[];
  scouter: string;
  alliance: string;
  alliancePos: string;
}
