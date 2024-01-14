import { EAssignmentActionType } from './EAssignmentActionType';

export type TAssignmentAction = {
  type: EAssignmentActionType;
  loadData?: any;
};
