import { EStartLocation2024, EPickupLocation2024, EScoreLocation2024, EEndgameLocation2024 } from "../../common/types/2024";

export type TLogActions = {
  addStartEvent: (location: EStartLocation2024) => void;
  addPickupEvent: (location: EPickupLocation2024) => void;
  modifyLastPickupEvent: (location: EPickupLocation2024) => void;
  addDropEvent: () => void;
  addScoreEvent: (location: EScoreLocation2024, x: number, y: number) => void;
  missedLastScore: () => void;
  addAutoEvent: (leave: boolean) => void;
  addEndgameEvent: (
    location: EEndgameLocation2024,
    notes: string,
    harmony: boolean,
    trap: number,
    spotlit: boolean
  ) => void;
};
