export type TDenseLog = {
  t: number; // teamNum
  m: number; // matchNum
  e: Record<string, any>[]; // events
  s: string; // scouter
  a: 'RED' | 'BLUE' | ''; // alliance
  p: '1' | '2' | '3' | ''; // alliancePos
};
