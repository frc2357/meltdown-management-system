export type TTabletAssignment = {
  event: string;
  alliance: 'RED' | 'BLUE' | '';
  alliancePos: '1' | '2' | '3' | '';
  matches: {matchNum: number, teamNum: number, scouter: string}[];
};
