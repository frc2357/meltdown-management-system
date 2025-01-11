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
import floorCoralImage from '../../../assets/floorCoral.png';
import { RobotState } from '../basics/RobotState';

const coralPickupStationNames: EPickupLocation2025[] = Object.values(EPickupLocation2025);
const numCoralPickupStations: number = coralPickupStationNames.length;
const numCoralScoreLocations: number = 7;

const algaeScoreOrder: EScoreLocation2025[] = [
  EScoreLocation2025.net,
  EScoreLocation2025.processor,
];
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

  const [isCoralVisible, setIsCoralVisible] = useState(
    new Array(numCoralScoreLocations).fill(false)
  );

  const [isAlgaeVisible, setIsAlgaeVisible] = useState(
    new Array(numAlgaeScoreLocations).fill(false)
  );

  const [clearAlgae, setClearAlgae] = useState<number>(0);

  const assignment: TAssignment = useAssignment();
  const log: TLogActions = useLog();

  const robotStateToImage: (state: ERobotState) => number = (state: ERobotState): number => {
    switch (state) {
      case ERobotState.coral:
        return floorCoralImage;
      case ERobotState.algae:
        return algaeImage;
      default:
        return emptyImage;
    }
  };

  const coralToGamepieceImage: (location: EScoreLocation2025) => number = (
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

  const clearCoralStateAndPickup: () => void = (): void => {
    setCoralPickupStates(new Array(numCoralPickupStations).fill(false));
    setCoralState(ERobotState.empty);
  };

  const onDropCoral: () => void = (): void => {
    log.addDropEvent(ERobotState.coral);
    clearCoralStateAndPickup();
  };

  const onDropAlgae: () => void = (): void => {
    log.addDropEvent(ERobotState.algae);
    setAlgaeState(ERobotState.empty);
  };

  const onMiss: () => void = (): void => {
    log.undoLastScore();
    setMissable(false);
    clearCoralStateAndPickup();
  };

  const onScore: (location: EScoreLocation2025) => void = (location: EScoreLocation2025): void => {
    log.addScoreEvent(location);
    setMissable(true);
  };

  const onScoreCoral: (location: EScoreLocation2025) => void = (
    location: EScoreLocation2025
  ): void => {
    onScore(location);
    clearCoralStateAndPickup();
  };

  const onScoreAlgae: (location: EScoreLocation2025) => void = (
    location: EScoreLocation2025
  ): void => {
    onScore(location);
    setAlgaeState(ERobotState.empty);
  };

  const toEndgame: () => void = (): void => {
    log.addAutoEvent(leave === 'checked');

    navigation.navigate('Endgame', { clearAlgae });
  };

  const pickupStationStyles = [
    buttonStyles.coralStationPressable,
    buttonStyles.coralFloorPressable,
  ];
  const gamepieceStyles = [buttonStyles.coralStationImage, buttonStyles.coralFloorImage];
  const pickupStations: any[] = [];

  for (let i: number = 0; i < numCoralPickupStations; i++) {
    pickupStations.push(
      <GamepieceButton
        key={coralPickupStationNames[i]}
        pressableStyle={pickupStationStyles[i]}
        imageStyle={gamepieceStyles[i]}
        gamePieceSrc={robotStateToImage(ERobotState.coral)}
        isHidden={coralPickupStates[i]}
        setHidden={(isHidden) => {
          if (!isHidden) {
            const newCoralPickupStates: boolean[] = new Array(numCoralPickupStations).fill(false);

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

  pickupStations.push(
    <GamepieceButton
      key={'Algae pickup'}
      pressableStyle={buttonStyles.algeaFloorPressable}
      imageStyle={buttonStyles.algaeFloorImage}
      gamePieceSrc={robotStateToImage(ERobotState.algae)}
      isHidden={algaeState === ERobotState.algae}
      setHidden={(isHidden) => {
        if (!isHidden) {
          log.addPickupEvent(EPickupLocation2025.floor, ERobotState.algae);

          setMissable(false);
          setAlgaeState(ERobotState.algae);
        }
      }}
    />
  );

  const reefLevelOrder = [
    EScoreLocation2025.reefL1,
    EScoreLocation2025.reefL2,
    EScoreLocation2025.reefL2,
    EScoreLocation2025.reefL3,
    EScoreLocation2025.reefL3,
    EScoreLocation2025.reefL4,
    EScoreLocation2025.reefL4,
  ];

  const gamepieceButtons = [];
  for (let i = 0; i < numCoralScoreLocations; i++) {
    gamepieceButtons.push(
      <GamepieceButton
        key={i}
        imageStyle={styles.reef}
        pressableStyle={coralGamepieceStyles[`${i + 1}`]}
        gamePieceSrc={coralToGamepieceImage(reefLevelOrder[i])}
        isHidden={!isCoralVisible[i]}
        setHidden={(isHidden) => {
          if (!isHidden && coralState === ERobotState.coral) {
            onScoreCoral(reefLevelOrder[i]);
            const newIsCoralVisible = [...isCoralVisible];
            newIsCoralVisible[i] = true;
            setIsCoralVisible(newIsCoralVisible);

            setTimeout((): void => {
              const newCoralVisible = [...isCoralVisible];
              newCoralVisible[i] = false;
              setIsCoralVisible(newCoralVisible);
            }, 500);
          }
        }}
      />
    );
  }

  const algaeImageStyles = [styles.barge, styles.processor];
  for (let i = 0; i < numAlgaeScoreLocations; i++) {
    gamepieceButtons.push(
      <GamepieceButton
        key={i + numCoralScoreLocations}
        imageStyle={algaeGamepieceStyles[`${i + 1}`]}
        pressableStyle={algaeImageStyles[i]}
        gamePieceSrc={algaeImage}
        isHidden={!isAlgaeVisible[i]}
        setHidden={(isHidden) => {
          if (!isHidden && algaeState === ERobotState.algae) {
            onScoreAlgae(algaeScoreOrder[i]);
            const newIsAlgaeVisible = [...isAlgaeVisible];
            newIsAlgaeVisible[i] = true;
            setIsAlgaeVisible(newIsAlgaeVisible);

            setTimeout((): void => {
              const newIsAlgaeVisible = [...isAlgaeVisible];
              newIsAlgaeVisible[i] = false;
              setIsAlgaeVisible(newIsAlgaeVisible);
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
        <Button variant="contained" title="Endgame" onPress={toEndgame} style={styles.button} />
        <Button
          variant="contained"
          title="Miss"
          onPress={onMiss}
          style={styles.button}
          disabled={!missable}
        />
        <RobotState
          style={styles.coralRobotState}
          stateSrc={robotStateToImage(coralState)}
          onDrop={onDropCoral}
          isDroppable={coralState !== ERobotState.empty}
        />
        <RobotState
          style={styles.algaeRobotState}
          stateSrc={robotStateToImage(algaeState)}
          onDrop={onDropAlgae}
          isDroppable={algaeState !== ERobotState.empty}
        />
        <ViewTimer />
      </HStack>
      <Box style={styles.images}>
        <Image alt="Reef" source={reefImage} style={styles.reef} />
        <Image alt="Barge" source={bargeImage} style={styles.barge} />
        <Image alt="Processor" source={processorImage} style={styles.processor} />
        <Image alt="Coral Station" source={coralStationImage} style={styles.coralStation} />
        <Image alt="Floor Intake" source={floorImage} style={styles.floor} />
        {pickupStations}
        {gamepieceButtons}
        <Button
          title={`Algae Cleared: ${clearAlgae}`}
          onPress={() => {
            let newClearAlgae: number = clearAlgae + 1;
            if (newClearAlgae >= 7) newClearAlgae = 0;
            setClearAlgae(newClearAlgae);
          }}
          style={{
            ...styles.clearAlgaeButton,
            backgroundColor: clearAlgae === 0 ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 255, 0, 1)',
          }}
        />
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
    left: 10,
    top: 0,
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
  coralRobotState: {
    height: 50,
    width: 100,
    marginTop: 8,
  },
  algaeRobotState: {
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

const coralGamepieceStyles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles
  1: {
    // ReefL1
    ...baseStyles.gamepiece,
    left: 170,
    top: 400,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  2: {
    // ReefL2A
    ...baseStyles.gamepiece,
    left: 100,
    top: 300,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  3: {
    // ReefL2B
    ...baseStyles.gamepiece,
    left: 200,
    top: 300,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  4: {
    // ReefL3A
    ...baseStyles.gamepiece,
    left: 100,
    top: 200,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  5: {
    // ReefL3B
    ...baseStyles.gamepiece,
    left: 200,
    top: 190,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  6: {
    // ReefL4A
    ...baseStyles.gamepiece,
    left: 100,
    top: 50,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  7: {
    // ReefL4B
    ...baseStyles.gamepiece,
    left: 200,
    top: 20,
  },
});

const algaeGamepieceStyles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles
  1: {
    // Net
    ...baseStyles.gamepiece,
    left: 500,
    top: 80,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  2: {
    // Processor
    ...baseStyles.gamepiece,
    left: 510,
    top: 390,
  },
});

const buttonStyles = StyleSheet.create({
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
    position: 'absolute',
    height: 45,
    width: 100,
    left: 800,
    top: 80,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  coralFloorImage: {
    position: 'absolute',
    height: 45,
    width: 100,
    left: 900,
    top: 330,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  algaeFloorImage: {
    ...baseStyles.gamepiece,
    left: 750,
    top: 330,
  },
});
