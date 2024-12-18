import { EEndgameLocation, EEventTypes, EPickupLocation, EStartLocation, EScoreLocation } from '..';

class ClassEvent2024 {
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

export interface TEvent2024 extends ClassEvent2024 {}

type TEventArray2024 = Array<keyof TEvent2024>;

const eventKeys2024: TEventArray2024 = Object.keys(new ClassEvent2024()) as TEventArray2024;

export let eventKeyToDense2024: Partial<Record<keyof TEvent2024, string>> = {};
eventKeys2024.forEach((key: keyof TEvent2024, index: number) => {
  eventKeyToDense2024[key] = String.fromCharCode('a'.charCodeAt(0) + index);
});

export let denseToEventKey2024: Record<string, keyof TEvent2024> = {};
eventKeys2024.forEach((key: keyof TEvent2024, index: number) => {
  eventKeyToDense2024[String.fromCharCode('a'.charCodeAt(0) + index)] = key;
});
