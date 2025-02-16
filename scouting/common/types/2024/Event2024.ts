import { EEventTypes } from '..';
import { EEndgameLocation2024 } from './EEndgameLocation2024';
import { EPickupLocation2024 } from './EPickupLocation2024';
import { EScoreLocation2024 } from './EScoreLocation2024';
import { EStartLocation2024 } from './EStartLocation2024';

class ClassEvent2024 {
  type?: EEventTypes = EEventTypes.start;
  timestamp?: number = 0;
  location?: EStartLocation2024 | EPickupLocation2024 | EScoreLocation2024 | EEndgameLocation2024 =
    EStartLocation2024.center;
  x?: number = 0;
  y?: number = 0;
  leave?: boolean = false;
  notes?: string = '';
  harmony?: boolean = false;
  spotlit?: boolean = false;
  trap?: number = 0;
  miss?: boolean = false;
}

export interface TEvent2024 extends ClassEvent2024 {}

export type TEventArray2024 = Array<keyof TEvent2024>;

export const eventKeys2024: TEventArray2024 = Object.keys(new ClassEvent2024()) as TEventArray2024;

export let eventKeyToDense2024: Partial<Record<keyof TEvent2024, string>> = {};
eventKeys2024.forEach((key: keyof TEvent2024, index: number) => {
  eventKeyToDense2024[key] = String.fromCharCode('a'.charCodeAt(0) + index);
});

export let denseToEventKey2024: Record<string, keyof TEvent2024> = {};
eventKeys2024.forEach((key: keyof TEvent2024, index: number) => {
  denseToEventKey2024[String.fromCharCode('a'.charCodeAt(0) + index)] = key;
});