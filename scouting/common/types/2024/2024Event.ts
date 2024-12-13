import { EEndgameLocation, EEventTypes, EPickupLocation, EStartLocation, EScoreLocation } from '..';

class Class2024Event {
  type?: EEventTypes;
  timestamp?: number;
  location?: EStartLocation | EPickupLocation | EScoreLocation | EEndgameLocation;
  x?: number;
  y?: number;
  leave?: boolean;
  notes?: string;
  harmony?: boolean;
  spotlit?: boolean;
  trap?: number;
  miss?: boolean;
}

export interface T2024Event extends Class2024Event {}

export type T2024EventArray = Array<keyof T2024Event>;

export const propsArray: T2024EventArray = Object.keys(new Class2024Event()) as T2024EventArray;
