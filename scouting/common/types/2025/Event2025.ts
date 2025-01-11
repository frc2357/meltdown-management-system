import { EEventTypes } from '..';
import { ERobotState } from '../../../sentinel/types';
import { EEndgameLocation2025 } from './EEndgameLocation2025';
import { EPickupLocation2025 } from './EPickupLocation2025';
import { EScoreLocation2025 } from './EScoreLocation2025';
import { EStartLocation2025 } from './EStartLocation2025';

class ClassEvent2025 {
  type?: EEventTypes = EEventTypes.start;
  timestamp?: number = 0;
  location?: EStartLocation2025 | EPickupLocation2025 | EScoreLocation2025 | EEndgameLocation2025 =
    EStartLocation2025.center;
  gamepiece?: ERobotState = ERobotState.empty;
  leave?: boolean = false;
  notes?: string = '';
  clearAlgae?: number = 0;
  defenseRating?: number = 0;
}

export interface TEvent2025 extends ClassEvent2025 {}

export type TEventArray2025 = Array<keyof TEvent2025>;

export const eventKeys2025: TEventArray2025 = Object.keys(new ClassEvent2025()) as TEventArray2025;

export let eventKeyToDense2025: Partial<Record<keyof TEvent2025, string>> = {};
eventKeys2025.forEach((key: keyof TEvent2025, index: number) => {
  eventKeyToDense2025[key] = String.fromCharCode('a'.charCodeAt(0) + index);
});

export let denseToEventKey2025: Record<string, keyof TEvent2025> = {};
eventKeys2025.forEach((key: keyof TEvent2025, index: number) => {
  denseToEventKey2025[String.fromCharCode('a'.charCodeAt(0) + index)] = key;
});
