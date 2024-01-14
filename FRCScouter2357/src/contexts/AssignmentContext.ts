import { createContext, useContext } from 'react';
import { EAssignmentActionTypes, TAssignment, TAssignmentAction } from '../../types';

export const AssignmentContext: React.Context<TAssignment> = createContext<TAssignment>({
  scouter: '',
  alliance: '',
  currentMatch: 0,
  matches: [],
});

export const useAssignment: () => TAssignment = (): TAssignment => {
  return useContext<TAssignment>(AssignmentContext);
};

export const AssignmentReducer: (
  assignment: TAssignment,
  action: TAssignmentAction
) => TAssignment = (assignment: TAssignment, action: TAssignmentAction): TAssignment => {
  switch (action.type) {
    case EAssignmentActionTypes.load:
      return action.loadData;
    case EAssignmentActionTypes.nextMatch:
      assignment.currentMatch++;
      return assignment;
  }
};
