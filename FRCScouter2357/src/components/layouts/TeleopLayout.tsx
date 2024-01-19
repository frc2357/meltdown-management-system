import React, { useState } from 'react';
import { Box, Button, HStack, Pressable } from '@react-native-material/core';
import { GestureResponderEvent, Image, StyleSheet } from 'react-native';
import noteImage from '../../../assets/note.png';
import emptyImage from '../../../assets/empty.png';
import { GamepieceButton } from '../basics/GamepieceButton';
import { ERobotState } from '../../../types/ERobotState';
import { useEventCreator } from '../../hooks/useEventCreator';
import { RadioButton } from 'react-native-paper';
import {
  ELogActionType,
  EPickupLocation,
  EScoreLocation,
  TEvent,
  TTeleopLayoutProps,
} from '../../../types';
import scoringImage from '../../../assets/scoring.png';
import sourceImage from '../../../assets/source.png';
import floorImage from '../../../assets/floor.png';
import { useLogDispatch } from '../../contexts/LogContext';

const pickupStationNames: EPickupLocation[] = Object.values(EPickupLocation);
const numPickupStations = pickupStationNames.length;

export const TeleopLayout: React.FC<TTeleopLayoutProps> = ({
  route: {
    params: { initialRobotState },
  },
  navigation,
}) => {
  const [leave, setLeave] = useState<'checked' | 'unchecked'>('unchecked');
  const [robotState, setRobotState] = useState(initialRobotState);
  const [lastPickup, setLastPickup] = useState<TEvent>();
  const [pickupStates, setPickupStates] = useState(
    new Array(numPickupStations).fill(ERobotState.empty)
  );
  const [noteIconVisible, setNoteIconVisible] = useState(false);
  const [noteIconCoords, setNoteIconCoords] = useState({ x: 0, y: 0 });
  const eventCreator = useEventCreator();
  const logDispatch = useLogDispatch();

  const robotStateToImage = (state: ERobotState) => {
    switch (state) {
      case ERobotState.note:
        return noteImage;
      default:
        return emptyImage;
    }
  };

  const showNoteIcon = (x: number, y: number): void => {
    setNoteIconVisible(true);
    const newNoteIconCoords = {
      x,
      y,
    };
    setNoteIconCoords(newNoteIconCoords);

    setTimeout(() => setNoteIconVisible(false), 500);
  };

  const clearRobotStateAndPickup = () => {
    setPickupStates(new Array(numPickupStations).fill(ERobotState.empty));
    setRobotState(ERobotState.empty);
  };

  const onDrop = () => {
    logDispatch({
      type: ELogActionType.addEvent,
      event: lastPickup,
    });
    logDispatch({
      type: ELogActionType.addEvent,
      event: eventCreator.createDrop(),
    });
    clearRobotStateAndPickup();
  };

  const onScore = (location: EScoreLocation) => {
    if (lastPickup) {
      logDispatch({
        type: ELogActionType.addEvent,
        event: lastPickup,
      });
    }
    logDispatch({
      type: ELogActionType.addEvent,
      event: eventCreator.createScore(location),
    });
    clearRobotStateAndPickup();
  };

  const toEndgame = () => {
    logDispatch({
      type: ELogActionType.addEvent,
      event: eventCreator.createAuto(leave === 'checked'),
    });
    navigation.navigate('Endgame');
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
        isHidden={pickupStates[i] === ERobotState.empty}
        setHidden={(isHidden) => {
          if (!isHidden) {
            const newPickupStates = new Array(numPickupStations).fill(ERobotState.empty);

            newPickupStates[i] = ERobotState.note;

            setLastPickup(eventCreator.createPickup(pickupStationNames[i]));

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
        <Button variant="contained" title="Endgame" onPress={toEndgame} style={styles.button} />
        <Image style={styles.robotState} alt="robotState" source={robotStateToImage(robotState)} />
      </HStack>
      <Box style={styles.images}>
        <Image alt="Field" source={scoringImage} style={styles.field} />
        <Image alt="double substation" source={sourceImage} style={styles.source} />
        <Image alt="floor intake" source={floorImage} style={styles.floor} />
        <Pressable
          style={styles.field}
          onPress={(event: GestureResponderEvent) => {
            if (robotState === ERobotState.empty) {
              return;
            }
            showNoteIcon(event.nativeEvent.locationX-25, event.nativeEvent.locationY-25);
            onScore(EScoreLocation.speaker);
          }}
          pressEffect={'none'}
        />
        <Pressable
          // eslint-disable-next-line react-native/no-color-literals, react-native/no-inline-styles
          style={{
            ...styles.ampPressable,
            backgroundColor: 'rgba(0,0,0,0.25)',
          }}
          onPress={() => {
            if (robotState === ERobotState.empty) {
              return;
            }
            showNoteIcon(100, 15);
            onScore(EScoreLocation.amp);
          }}
          disabled={robotState === ERobotState.empty}
        />
        {noteIconVisible && (
          <Image
            alt="note"
            source={noteImage}
            style={{
              resizeMode: 'stretch',
              position: 'absolute',
              height: 50,
              width: 50,
              left: noteIconCoords.x,
              top: noteIconCoords.y,
            }}
          />
        )}
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
  ampPressable: {
    height: 80,
    left: 0,
    position: 'absolute',
    top: 0,
    width: 215,
  },
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
