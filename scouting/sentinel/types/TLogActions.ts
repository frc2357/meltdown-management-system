import { EStartLocation2025, EPickupLocation2025, EScoreLocation2025, EEndgameLocation2025 } from "../../common/types/2025";

export type TLogActions = {
  addStartEvent: (location: EStartLocation2025) => void;
  addPickupEvent: (location: EPickupLocation2025) => void;
  modifyLastPickupEvent: (location: EPickupLocation2025) => void;
  addDropEvent: () => void;
  addScoreEvent: (location: EScoreLocation2025, x: number, y: number) => void;
  undoLastScore: () => void;
  addAutoEvent: (leave: boolean) => void;
  addEndgameEvent: (
    location: EEndgameLocation2025,
    notes: string,
    clearAlgae: boolean
  ) => void;
};
