import { ELogActionType } from './ELogActionType';
import { TAssignmentBase, TEvent } from '../../common/types';

export type TLogAction = {
  type: ELogActionType;
  event?: TEvent;
  assignment?: { teamNum: number; matchNum: number; scouter: string } & TAssignmentBase;
};
