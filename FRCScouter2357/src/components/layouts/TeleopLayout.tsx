import React, { useState } from 'react';
import { Box, Button, HStack } from '@react-native-material/core';
import { Image, StyleSheet } from 'react-native';
import note from '../../../assets/note.png';
import emptyImage from '../../../assets/empty.png';
import { GamepieceButton } from '../basics/GamepieceButton';
import { ERobotStates } from '../../../types/ERobotStates';
import { useEventCreator } from '../../hooks/useEventCreator';
import { RadioButton } from 'react-native-paper';
import { TTeleopLayoutProps } from '../../../types';
import scoringImage from '../../../assets/scoring.png';
import sourceImage from '../../../assets/source.png';
import floorImage from '../../../assets/floor.png';

const numPickupStations = 2;

const pickupStationNames = ['doubleSub', 'singleSub', 'floor'];

export const TeleopLayout: React.FC<TTeleopLayoutProps> = ({
  route: {
    params: { initialRobotState, isAuto },
  },
  navigation,
}) => {
  const [leave, setLeave] = useState<'checked' | 'unchecked'>('unchecked');
  const [robotState, setRobotState] = useState(initialRobotState);
  const [lastPickup, setLastPickup] = useState();
  const [pickupStates, setPickupStates] = useState(
    new Array(numPickupStations).fill(ERobotStates.empty)
  );
  const eventCreator = useEventCreator();

  const robotStateToImage = (state) => {
    switch (state) {
      case ERobotStates.note:
        return note;
      default:
        return emptyImage;
    }
  };

  const clearRobotStateAndPickup = () => {
    setPickupStates(new Array(numPickupStations).fill(ERobotStates.empty));
    setRobotState(ERobotStates.empty);
  };

  const onDrop = () => {
    clearRobotStateAndPickup();
  };

  const onScore = (position) => {
    if (lastPickup) {
    }
  };

  const pickupStationStyles = [buttonStyles.sourcePressable, buttonStyles.floorPressable];
  const gamepieceStyles = [buttonStyles.sourceImage, buttonStyles.floorImage];
  const pickupStations = [];

  for (let i = 0; i < numPickupStations; i++) {
    pickupStations.push(
      <GamepieceButton
        key={pickupStationNames[i]}
        style={pickupStationStyles[i]}
        imageStyle={gamepieceStyles[i]}
        gamePieceSrc={robotStateToImage(pickupStates[i])}
        isHidden={pickupStates[i] === ERobotStates.empty}
        setHidden={(isHidden) => {
          if (!isHidden) {
            const newPickupStates = new Array(numPickupStations).fill(ERobotStates.empty);

            newPickupStates[i] = ERobotStates.note;

            setLastPickup(eventCreator.createPickup(robotState, pickupStationNames[i], isAuto));

            setRobotState(newPickupStates[i]);

            setPickupStates(newPickupStates);
          }
        }}
      />
    );
  }

  return (
    <Box>
      <HStack spacing={6} style={styles.buttonStack}>
        <RadioButton.Item
          label="Leave"
          value="leave"
          status={leave}
          onPress={() => {
            setLeave(leave === 'unchecked' ? 'checked' : 'unchecked');
          }}
        />
        <Button variant="contained" title="Drop" onPress={onDrop} style={styles.button} />
        <Button
          variant="contained"
          title="Endgame"
          onPress={() => navigation.navigate('Endgame')}
          style={styles.button}
        />
        <Image style={styles.robotState} alt="robotState" source={robotStateToImage(robotState)} />
      </HStack>
      <Box style={styles.images}>
        <Image alt="Field" source={scoringImage} style={styles.field} />
        <Image alt="double substation" source={sourceImage} style={styles.source} />
        <Image alt="floor intake" source={floorImage} style={styles.floor} />
        {pickupStations}
      </Box>
    </Box>
  );
};

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
  },
  buttonStack: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    margin: 4,
  },
  field: {
    height: 495,
    left: 0,
    position: 'absolute',
    resizeMode: 'stretch',
    top: 0,
    width: 700,
  },
  floor: {
    height: 235,
    left: 705,
    position: 'absolute',
    top: 261,
    width: 325,
  },
  images: {
    marginTop: 10,
  },
  robotState: {
    height: 50,
    width: 50,
  },
  source: {
    height: 256,
    left: 705,
    position: 'absolute',
    top: 0,
    width: 325,
  },
});

const buttonStyles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles
  sourcePressable: {
    ...styles.source,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  floorPressable: {
    ...styles.floor,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  sourceImage: {
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