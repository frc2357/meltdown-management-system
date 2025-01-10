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

const coralPickupStationNames: EPickupLocation2025[] = Object.values(EPickupLocation2025).filter((x: EPickupLocation2025) => x.includes('reef'));
const numCoralPickupStations: number = coralPickupStationNames.length;
const numCoralScoreLocations: number = 7;

const algaePickupStationNames: EPickupLocation2025[] = Object.values(EPickupLocation2025).filter((x: EPickupLocation2025) => !x.includes('reef'));
const numAlgaePickupStations: number = coralPickupStationNames.length;
const numAlgaeScoreLocations: number = 2;

export type PTeleop = NativeStackScreenProps<TRootStackParamList, 'Teleop'>;

export function Teleop({
  route: {
    params: { initialRobotState },
  },
  navigation,
}: PTeleop): React.JSX.Element {
  const [leave, setLeave] = useState<'checked' | 'unchecked'>('unchecked');
  const [coralState, setCoralState] = useState<ERobotState>(initialRobotState);
  const [algaeState, setAlgaeState] = useState<ERobotState>(ERobotState.empty);

  const [missable, setMissable] = useState<boolean>(false);
  const [coralPickupStates, setCoralPickupStates] = useState<boolean[]>(
    new Array(numCoralPickupStations).fill(false)
  );

  const [hasAlgae, setHasAlgae] = useState<boolean>(false);
  const [isGamepieceVisible, setGamepieceVisible] = useState(
    new Array(numCoralScoreLocations).fill(false)
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
      case EScoreLocation2025.processor:
        return algaeImage
      case EScoreLocation2025.net:
        return algaeImage;
    }
  };

  const clearRobotStateAndPickup: () => void = (): void => {
    setCoralPickupStates(new Array(numCoralPickupStations).fill(ERobotState.empty));
    setCoralState(ERobotState.empty);
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

  const pickupStationStyles = [buttonStyles.coralStationPressable, buttonStyles.coralFloorPressable];
  const gamepieceStyles = [buttonStyles.coralStationImage, buttonStyles.coralFloorImage];
  const pickupStations: any[] = [];

  for (let i: number = 0; i < numCoralPickupStations; i++) {
    pickupStations.push(
      <GamepieceButton
        key={coralPickupStationNames[i]}
        style={pickupStationStyles[i]}
        imageStyle={gamepieceStyles[i]}
        gamePieceSrc={robotStateToImage(ERobotState.coral)}
        isHidden={coralPickupStates[i]}
        setHidden={(isHidden) => {
          if (!isHidden) {
            const newCoralPickupStates: boolean[] = new Array(numCoralPickupStations).fill(
              false
            );

            newCoralPickupStates[i] = true;

            if (coralState !== ERobotState.empty) {
              log.modifyLastPickupEvent(coralPickupStationNames[i]);
            } else {
              log.addPickupEvent(coralPickupStationNames[i], ERobotState.coral);
            }

            setMissable(false);
            setCoralState(ERobotState.coral);
            setCoralPickupStates(newCoralPickupStates);
          }
        }}
      />
    );
  }

  pickupStations.push(<GamepieceButton
    key={"Algae pickup"}
    style={buttonStyles.algeaFloorPressable}
    imageStyle={buttonStyles.algaeFloorImage}
    gamePieceSrc={robotStateToImage(ERobotState.algae)}
    isHidden={hasAlgae}
    setHidden={(isHidden) => {
      if (!isHidden) {
        log.addPickupEvent(EPickupLocation2025.floor, ERobotState.algae);
      
        setMissable(false);
        setAlgaeState(ERobotState.algae);
        setHasAlgae(true);
      }
    }}
  />)

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
  for (let i = 0; i < numCoralScoreLocations; i++) {
    gamepieceButtons.push(
      <GamepieceButton
        key={i}
        style={buttonStyles[`gamepieceButton${(i + 1)}`]}
        gamePieceSrc={scoreLocationToGamepieceImage(levelOrder[i])}
        isHidden={false}
        setHidden={(isHidden) => {
          if (
            !isHidden ||
            (coralState === ERobotState.coral && i < 7) ||
            (coralState === ERobotState.algae && i >= 7)
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
          title="Drop"
          onPress={onDrop}
          style={styles.button}
          disabled={coralState === ERobotState.empty}
        />
        <Button variant="contained" title="Endgame" onPress={toEndgame} style={styles.button} />
        <Image style={styles.robotState} alt="robotState" source={robotStateToImage(coralState)} />
        <Image style={styles.robotState} alt="robotState" source={robotStateToImage(algaeState)} />
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
    top: 258.5,
    width: 325,
  },
  barge: {
    height: 256,
    left: 402.5,
    position: 'absolute',
    top: 0,
    width: 300,
  },
  processor: {
    height: 237.5,
    left: 402.5,
    position: 'absolute',
    top: 258.5,
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
  gamepieceButton1: {
    // ReefL1
    ...baseStyles.gamepiece,
    left: 170,
    top: 400,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  gamepieceButton2: {
    // ReefL2A
    ...baseStyles.gamepiece,
    left: 100,
    top: 0,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  gamepieceButton3: {
    // ReefL2B
    ...baseStyles.gamepiece,
    left: 100,
    top: 100,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  gamepieceButton4: {
    // ReefL3A
    ...baseStyles.gamepiece,
    left: 245,
    top: 170,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  gamepieceButton5: {
    // ReefL3B
    ...baseStyles.gamepiece,
    left: 325,
    top: 190,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  gamepieceButton6: {
    // ReefL4A
    ...baseStyles.gamepiece,
    left: 405,
    top: 190,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  gamepieceButton7: {
    // ReefL4B
    ...baseStyles.gamepiece,
    left: 480,
    top: 200,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  gamepieceButton8: {
    // Net
    ...baseStyles.gamepiece,
    left: 0,
    top: 0,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  gamepieceButton9: {
    // Processor
    ...baseStyles.gamepiece,
    left: 100,
    top: 0,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  coralStationPressable: {
    ...styles.coralStation,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  coralFloorPressable: {
    height: 235,
    left: 867.5,
    position: 'absolute',
    top: 258.5,
    width: 162.5,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  algeaFloorPressable: {
    height: 235,
    left: 705,
    position: 'absolute',
    top: 258.5,
    width: 162.5,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  coralStationImage: {
    ...baseStyles.gamepiece,
    left: 120,
    top: 110,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  coralFloorImage: {
    ...baseStyles.gamepiece,
    left: 60,
    top: 90,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  algaeFloorImage: {
    ...baseStyles.gamepiece,
    left: 60,
    top: 90,
  }
});
