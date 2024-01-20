import React, { createContext, useContext, useReducer } from 'react';
import {
  EAssignmentActionType,
  TAssignment,
  TAssignmentAction,
  TAssignmentMatch,
} from '../../types';

const assignmentDefault: TAssignment = {
  alliance: '',
  event: '',
  matches: [],
  alliancePos: '',
};

const AssignmentContext: React.Context<TAssignment> = createContext<TAssignment>(assignmentDefault);

const AssignmentDispatchContext: React.Context<React.Dispatch<TAssignmentAction>> =
  createContext<React.Dispatch<TAssignmentAction>>(null);

export const useAssignment: () => TAssignment = (): TAssignment => {
  return useContext<TAssignment>(AssignmentContext);
};

export const useAssignmentDispatch: () => React.Dispatch<TAssignmentAction> =
  (): React.Dispatch<TAssignmentAction> => {
    return useContext<React.Dispatch<TAssignmentAction>>(AssignmentDispatchContext);
  };

export const AssignmentProvider: React.FC<React.PropsWithChildren> = ({
  children,
}: React.PropsWithChildren) => {
  const [log, dispatch] = useReducer<React.Reducer<TAssignment, TAssignmentAction>>(
    assignmentReducer,
    assignmentDefault
  );

  return (
    <AssignmentContext.Provider value={log}>
      <AssignmentDispatchContext.Provider value={dispatch}>
        {children}
      </AssignmentDispatchContext.Provider>
    </AssignmentContext.Provider>
  );
};

export const assignmentReducer: React.Reducer<TAssignment, TAssignmentAction> = (
  assignment: TAssignment,
  action: TAssignmentAction
): TAssignment => {
  switch (action.type) {
    case EAssignmentActionType.load:
      const newValue: TAssignment = JSON.parse(action.loadData);

      newValue.currentMatch = newValue.matches[0];
      // TODO: Check if assignment valid and do something if it is not
      return newValue;
    case EAssignmentActionType.nextMatch:
      const nextMatch: TAssignmentMatch | undefined = assignment.matches.find(
        (x: TAssignmentMatch) => x.matchNum === assignment.currentMatch.matchNum + 1
      );
      assignment.currentMatch = nextMatch;
      return assignment;
  }
};
