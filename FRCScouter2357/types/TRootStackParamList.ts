import { ERobotState } from '.';

export type TRootStackParamList = {
  Startup: undefined;
  MatchLogs: undefined;
  QRCapture: undefined;
  Prematch: undefined;
  TeleopLayout: { initialRobotState: ERobotState; isAuto: boolean };
  Endgame: undefined;
  QRShow: undefined;
};
