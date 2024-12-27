## Updating to 2025
- [x] Run `mms update-scouting-version 2025.0.1`
- [x] In `scouting/common/types`, create a `2025` folder. In the folder, copy in contents from `scouting/common/types/2024`
- [ ] Update type names to 2025, update event structure and enum values as needed.
- [x] Update `scouting/common/helpers/yearConfig` to have a case for 2025.
- [ ] At this point the **Overseer** application is updated for 2025, **Sentinel** will require significant re-work for the 2025 game
  - [ ] Will need to update the `LogContext`'s `useLog` hook to include 2025 event logic
  - [ ] Will need to update the `prematch` screen
  - [ ] Will need to update the `teleop` screen
  - [ ] Will need to update the `endGame` screen