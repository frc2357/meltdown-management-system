import { ERobotStates } from '.';

export type TRootStackParamList = {
  Startup: undefined;
  MatchLogs: undefined;
  QRCapture: undefined;
  Prematch: undefined;
  TeleopLayout: { initialRobotState: ERobotStates; isAuto: boolean };
  Endgame: undefined;
  QRShow: undefined;
};
