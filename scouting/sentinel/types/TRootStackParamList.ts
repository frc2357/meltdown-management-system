import { ERobotState } from '.';

export type TRootStackParamList = {
  Startup: undefined;
  MatchLogs: undefined;
  QRCapture: undefined;
  Prematch: undefined;
  Teleop: { initialRobotState: ERobotState };
  Endgame: undefined;
  QRShow: { routeName: keyof TRootStackParamList; path: string };
};
