import { EEndgameLocation } from '.';
import { EEventTypes } from '.';
import { EPickupLocation } from '.';
import { EScoreLocation } from '.';
import { EStartLocation } from '.';

export type TDenseEvent = {
  t?: EEventTypes; // type
  c?: number; // timestamp
  l?: EStartLocation | EPickupLocation | EScoreLocation | EEndgameLocation; // location
  x?: number; // x
  y?: number; // y
  o?: boolean; // leave
  n?: string; // notes
  h?: boolean; // harmony
  s?: boolean; // spotlit
  r?: number; // trap
  m?: boolean; // miss
};
