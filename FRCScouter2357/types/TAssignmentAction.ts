import { EAssignmentActionTypes } from "./EAssignmentActionTypes"

export type TAssignmentAction = {
  type: EAssignmentActionTypes;
  loadData?: any;
}