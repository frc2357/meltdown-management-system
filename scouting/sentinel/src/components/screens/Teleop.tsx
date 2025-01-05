import React, { useState } from 'react';
import { Box, Button, HStack, Text } from '@react-native-material/core';
import { Image, StyleSheet } from 'react-native';
import topCoralImage from '../../../assets/topCoral.png';
import bottomCoralImage from '../../../assets/bottomCoral.png';
import algaeImage from '../../../assets/algae.png';
import emptyImage from '../../../assets/empty.png';
import { GamepieceButton } from '../basics/GamepieceButton';
import { ERobotState } from '../../../types/ERobotState';
import { RadioButton } from 'react-native-paper';
import { TLogActions, TRootStackParamList } from '../../../types';
import { TAssignment } from '../../../../common/types';
import { EPickupLocation2025, EScoreLocation2025 } from '../../../../common/types/2025';
import reefImage from '../../../assets/reef.png';
import coralStationImage from '../../../assets/coralStation.png';
import floorImage from '../../../assets/floor.png';
import { useAssignment } from '../../contexts/AssignmentContext';
import { ViewTimer } from '../basics/ViewTimer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useLog } from '../../contexts/LogContext';
import bargeImage from '../../../assets/barge.png';
import processorImage from '../../../assets/processor.png';
import angledCoralImage from '../../../assets/angledCoral.png';

const pickupStationNames: EPickupLocation2025[] = Object.values(EPickupLocation2025);
const numPickupStations: number = pickupStationNames.length;

const numScoreLocations: number = 7;

export type PTeleop = NativeStackScreenProps<TRootStackParamList, 'Teleop'>;

export function Teleop({
  route: {
    params: { initialRobotState },
  },
  navigation,
}: PTeleop): React.JSX.Element {
  const [leave, setLeave] = useState<'checked' | 'unchecked'>('unchecked');
  const [robotState, setRobotState] = useState<ERobotState>(initialRobotState);
  const [missable, setMissable] = useState<boolean>(false);
  const [pickupStates, setPickupStates] = useState(
    new Array(numPickupStations).fill(ERobotState.empty)
  );
  const [isGamepieceVisible, setGamepieceVisible] = useState(
    new Array(numScoreLocations).fill(false)
  );
  const [canClearAlgae, setCanClearAlgae] = useState<boolean>(false);
  const assignment: TAssignment = useAssignment();
  const log: TLogActions = useLog();

  const robotStateToImage: (state: ERobotState) => number = (state: ERobotState): number => {
    switch (state) {
      case ERobotState.coral:
        return bottomCoralImage;
      case ERobotState.algae:
        return algaeImage;
      default:
        return emptyImage;
    }
  };

  const scoreLocationToGamepieceImage: (location: EScoreLocation2025) => number = (
    location: EScoreLocation2025
  ): number => {
    switch (location) {
      case EScoreLocation2025.reefL1:
        return bottomCoralImage;
      case EScoreLocation2025.reefL2:
        return angledCoralImage;
      case EScoreLocation2025.reefL3:
        return angledCoralImage;
      case EScoreLocation2025.reefL4:
        return topCoralImage;
    }
  };

  const clearRobotStateAndPickup: () => void = (): void => {
    setPickupStates(new Array(numPickupStations).fill(ERobotState.empty));
    setRobotState(ERobotState.empty);
  };

  const onDrop: () => void = (): void => {
    log.addDropEvent();
    setMissable(false);
    clearRobotStateAndPickup();
  };

  const onMiss: () => void = (): void => {
    log.undoLastScore();
    setMissable(false);
    clearRobotStateAndPickup();
  };

  const onScore: (location: EScoreLocation2025) => void = (location: EScoreLocation2025): void => {
    log.addScoreEvent(location);
    setMissable(true);
    clearRobotStateAndPickup();
  };

  const toEndgame: () => void = (): void => {
    log.addAutoEvent(leave === 'checked');

    navigation.navigate('Endgame');
  };

  const pickupStationStyles = [buttonStyles.coralStationPressable, buttonStyles.floorPressable];
  const gamepieceStyles = [buttonStyles.coralStationImage, buttonStyles.floorImage];
  const pickupStations: any[] = [];

  for (let i: number = 0; i < numPickupStations; i++) {
    pickupStations.push(
      <GamepieceButton
        key={pickupStationNames[i]}
        style={pickupStationStyles[i]}
        imageStyle={gamepieceStyles[i]}
        gamePieceSrc={robotStateToImage(pickupStates[i])}
        isHidden={pickupStates[i] === ERobotState.empty}
        setHidden={(isHidden) => {
          if (!isHidden) {
            const newPickupStates: ERobotState[] = new Array(numPickupStations).fill(
              ERobotState.empty
            );

            newPickupStates[i] =
              pickupStationNames[i] === EPickupLocation2025.floor && ERobotState.coral
                ? ERobotState.algae
                : ERobotState.coral;

            if (robotState !== ERobotState.empty) {
              log.modifyLastPickupEvent(pickupStationNames[i], newPickupStates[i]);
            } else {
              log.addPickupEvent(pickupStationNames[i], newPickupStates[i]);
            }

            setMissable(false);
            setRobotState(newPickupStates[i]);
            setPickupStates(newPickupStates);
          }
        }}
      />
    );
  }

  const levelOrder = [
    EScoreLocation2025.reefL1,
    EScoreLocation2025.reefL2,
    EScoreLocation2025.reefL2,
    EScoreLocation2025.reefL3,
    EScoreLocation2025.reefL3,
    EScoreLocation2025.reefL4,
    EScoreLocation2025.reefL4,
    EScoreLocation2025.net,
    EScoreLocation2025.processor,
  ];

  const gamepieceButtons = [];
  for (let i = 0; i < numScoreLocations; i++) {
    gamepieceButtons.push(
      <GamepieceButton
        key={i}
        style={buttonStyles['gamepieceButton' + (i + 1)]}
        gamePieceSrc={scoreLocationToGamepieceImage(levelOrder[i])}
        isHidden={!isGamepieceVisible[i]}
        setHidden={(isHidden) => {
          if (
            !isHidden ||
            (robotState === ERobotState.coral && i < 7) ||
            (robotState === ERobotState.algae && i >= 7)
          ) {
            onScore(levelOrder[i]);
            const newIsGamepieceVisible = [...isGamepieceVisible];
            newIsGamepieceVisible[i] = true;
            setGamepieceVisible(newIsGamepieceVisible);

            setTimeout((): void => {
              const newIsGamepieceVisible = [...isGamepieceVisible];
              newIsGamepieceVisible[i] = false;
              setGamepieceVisible(newIsGamepieceVisible);
            }, 500);
          }
        }}
      />
    );
  }

  return (
    <Box>
      <HStack spacing={0} style={styles.buttonStack}>
        <Text variant="body1">Team: {assignment?.currentMatch.teamNum ?? ''}</Text>
        <RadioButton.Item
          label="Leave"
          value="leave"
          status={leave}
          onPress={(): void => {
            setLeave(leave === 'unchecked' ? 'checked' : 'unchecked');
          }}
        />
        <Button
          variant="contained"
          title="Miss"
          onPress={onMiss}
          style={styles.button}
          disabled={!missable}
        />
        <Button
          variant="contained"
          title="Pass"
          onPress={onDrop}
          style={styles.button}
          disabled={robotState === ERobotState.empty}
        />
        <Button variant="contained" title="Endgame" onPress={toEndgame} style={styles.button} />
        <Image style={styles.robotState} alt="robotState" source={robotStateToImage(robotState)} />
        <ViewTimer />
      </HStack>
      <Box style={styles.images}>
        <Image alt="Reef" source={reefImage} style={styles.reef} />
        <Button
          title="Clear Algae"
          onPress={() => setCanClearAlgae(!canClearAlgae)}
          style={{
            ...styles.clearAlgaeButton,
            backgroundColor: canClearAlgae ? 'rgba(255, 0, 0, 0)' : 'rgba(-, 255, 0, 0)',
          }}
        ></Button>
        <Image alt="Barge" source={bargeImage} style={styles.barge} />
        <Image alt="Processor" source={processorImage} style={styles.processor} />
        <Image alt="Coral Station" source={coralStationImage} style={styles.coralStation} />
        <Image alt="Floor Intake" source={floorImage} style={styles.floor} />
        {pickupStations}
        {gamepieceButtons}
      </Box>
    </Box>
  );
}

const baseStyles = StyleSheet.create({
  gamepiece: {
    height: 70,
    position: 'absolute',
    width: 70,
  },
});

const styles = StyleSheet.create({
  button: {
    width: 120,
    marginTop: 10,
  },
  clearAlgaeButton: {
    width: 120,
    left: 100,
    top: 500,
  },
  buttonStack: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'space-evenly',
    margin: 4,
  },
  reef: {
    height: 495,
    left: 0,
    position: 'absolute',
    top: 0,
    width: 400,
  },
  floor: {
    height: 235,
    left: 705,
    position: 'absolute',
    top: 261,
    width: 325,
  },
  barge: {
    height: 200,
    left: 400,
    position: 'absolute',
    top: 0,
    width: 300,
  },
  processor: {
    height: 200,
    left: 700,
    position: 'absolute',
    top: 205,
    width: 300,
  },
  images: {
    marginTop: 10,
  },
  robotState: {
    height: 50,
    width: 50,
    marginTop: 8,
  },
  coralStation: {
    height: 256,
    left: 705,
    position: 'absolute',
    top: 0,
    width: 325,
  },
});

const buttonStyles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles
  button1: {
    // ReefL1
    ...baseStyles.gamepiece,
    left: 13,
    top: 130,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  button2: {
    // ReefL2A
    ...baseStyles.gamepiece,
    left: 90,
    top: 150,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  button3: {
    // ReefL2B
    ...baseStyles.gamepiece,
    left: 170,
    top: 150,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  button4: {
    // ReefL3A
    ...baseStyles.gamepiece,
    left: 245,
    top: 170,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  button5: {
    // ReefL3B
    ...baseStyles.gamepiece,
    left: 325,
    top: 190,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  button6: {
    // ReefL4A
    ...baseStyles.gamepiece,
    left: 405,
    top: 190,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  button7: {
    // ReefL4B
    ...baseStyles.gamepiece,
    left: 480,
    top: 200,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  button8: {
    // Net
    ...baseStyles.gamepiece,
    left: 480,
    top: 200,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  button9: {
    // Processor
    ...baseStyles.gamepiece,
    left: 480,
    top: 200,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  coralStationPressable: {
    ...styles.coralStation,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  floorPressable: {
    ...styles.floor,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  coralStationImage: {
    ...baseStyles.gamepiece,
    left: 120,
    top: 110,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  floorImage: {
    ...baseStyles.gamepiece,
    left: 135,
    top: 90,
  },
});
