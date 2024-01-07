import React, { useState } from 'react';
import { Box, Button, HStack } from '@react-native-material/core';
import { Image, StyleSheet } from 'react-native';
import coneImage from '../../images/cone.png';
import cubeImage from '../../images/cube.png';
import emptyImage from '../../images/empty.png';
import GamepieceButton from '../basics/GamepieceButton';
import robotStates from '../../util/robotStates';
import PropTypes from 'prop-types';
import { addEvent } from '../../state/matchLogSlice';
import useEventCreator from '../../hooks/useEventCreator';

const numGamepieces = 27;
const numHybridNodes = 9;
const numPickupStations = 3;

const pickupStationNames = ['doubleSub', 'singleSub', 'floor'];

TeleopLayout.propTypes = {
  route: PropTypes.object.isRequired,
};

export default function TeleopLayout({
  route: {
    params: { initialRobotState, isAuto },
  },
  navigation,
}) {
  const [robotState, setRobotState] = useState(initialRobotState);
  const [lastPickup, setLastPickup] = useState();
  const [isScored, setScored] = useState(new Array(numGamepieces).fill(false));
  const [hybridStates, setHybridStates] = useState(
    new Array(numHybridNodes).fill(robotStates.empty)
  );
  const [pickupStates, setPickupStates] = useState(
    new Array(numPickupStations).fill(robotStates.empty)
  );
  const eventCreator = useEventCreator();

  const robotStateToImage = (state) => {
    switch (state) {
      case robotStates.cone:
        return coneImage;
      case robotStates.cube:
        return cubeImage;
      default:
        return emptyImage;
    }
  };

  const clearRobotStateAndPickup = () => {
    setPickupStates(new Array(numPickupStations).fill(robotStates.empty));
    setRobotState(robotStates.empty);
  };

  const onDrop = () => {
    clearRobotStateAndPickup();
  };

  const onScore = (position) => {
    if (lastPickup) {
    }
    };

  const gamepieceRow = [
    robotStates.cone,
    robotStates.cube,
    robotStates.cone,
    robotStates.cone,
    robotStates.cube,
    robotStates.cone,
    robotStates.cone,
    robotStates.cube,
    robotStates.cone,
  ];
  const gamepieceOrder = [...gamepieceRow, ...gamepieceRow, ...gamepieceRow];

  const buttons = [];
  for (let i = 0; i < 18; i++) {
    buttons.push(
      <GamepieceButton
        key={i}
        style={buttonStyles['button' + (i + 1)]}
        gamepiece={robotStateToImage(gamepieceOrder[i])}
        isHidden={!isScored[i]}
        setHidden={(isHidden) => {
          if (!isHidden) {
            if (robotState !== gamepieceOrder[i] || isScored[i]) {
              return;
            }

            onScore(i);
            clearRobotStateAndPickup();
          }

          if (isHidden === isScored[i]) {
            const newScore = [...isScored];
            newScore[i] = !isHidden;
            setScored(newScore);
          }
        }}
      />
    );
  }

  for (let i = 18; i < 27; i++) {
    const hybridIdx = i % 18;
    buttons.push(
      <GamepieceButton
        key={i}
        style={buttonStyles['button' + (i + 1)]}
        gamepiece={robotStateToImage(hybridStates[hybridIdx])}
        isHidden={!isScored[i]}
        setHidden={(isHidden) => {
          if (!isHidden) {
            if (robotState === robotStates.empty || isScored[i]) {
              return;
            }
            const newHybridStates = [...hybridStates];
            newHybridStates[hybridIdx] = robotState;

            onScore(i);
            setHybridStates(newHybridStates);
            clearRobotStateAndPickup();
          }

          if (isHidden === isScored[i]) {
            const newScore = [...isScored];
            newScore[i] = !isHidden;
            setScored(newScore);
          }
        }}
      />
    );
  }

  const pickupStationStyles = [
    buttonStyles.doubleSubPressable,
    buttonStyles.singleSubPressable,
    buttonStyles.floorPressable,
  ];
  const gamepieceStyles = [
    buttonStyles.doubleSubImage,
    buttonStyles.singleSubImage,
    buttonStyles.floorImage,
  ];
  const pickupStations = [];

  for (let i = 0; i < numPickupStations; i++) {
    pickupStations.push(
      <GamepieceButton
        key={pickupStationNames[i]}
        style={pickupStationStyles[i]}
        imageStyle={gamepieceStyles[i]}
        gamepiece={robotStateToImage(pickupStates[i])}
        isHidden={pickupStates[i] === robotStates.empty}
        setHidden={(isHidden) => {
          if (!isHidden) {
            const newPickupStates = new Array(3).fill(robotStates.empty);

            newPickupStates[i] =
              pickupStates[i] === robotStates.cone ? robotStates.cube : robotStates.cone;

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
        <Button
          variant="contained"
          title="Auto"
          onPress={() => navigation.navigate('AutoScreen')}
          style={styles.button}
        />
        <Button variant="contained" title="Drop" onPress={onDrop} style={styles.button} />
        <Button
          variant="contained"
          title="Endgame"
          onPress={() => navigation.navigate('EndgameScreen')}
          style={styles.button}
        />
        <Image style={styles.robotState} alt="robotState" source={robotStateToImage(robotState)} />
      </HStack>
      <Box>
        <Image alt="Columns" source={require('../../images/grid.png')} style={styles.columns} />
        <Image
          alt="double substation"
          source={require('../../images/doubleSub.png')}
          style={styles.doubleSub}
        />
        <Image alt="floor intake" source={require('../../images/floor.png')} style={styles.floor} />
        <Image
          alt="Single substation"
          source={require('../../images/singleSub.png')}
          style={styles.singleSub}
        />
        {buttons}
        {pickupStations}
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
  },
  buttonStack: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    margin: 4,
  },
  columns: {
    height: 484,
    left: 0,
    position: 'absolute',
    top: 0,
    width: 700,
  },
  doubleSub: {
    height: 250,
    left: 705,
    position: 'absolute',
    top: 0,
    width: 325,
  },
  floor: {
    height: 230,
    left: 705,
    position: 'absolute',
    top: 255,
    width: 160,
  },
  robotState: {
    height: 50,
    width: 50,
  },
  singleSub: {
    height: 230,
    left: 870,
    position: 'absolute',
    top: 255,
    width: 160,
  },
});

const buttonStyles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles
  button1: {
    ...baseStyles.gamepiece,
    left: 13,
    top: 130,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  button2: {
    ...baseStyles.gamepiece,
    left: 90,
    top: 150,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  button3: {
    ...baseStyles.gamepiece,
    left: 170,
    top: 150,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  button4: {
    ...baseStyles.gamepiece,
    left: 245,
    top: 170,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  button5: {
    ...baseStyles.gamepiece,
    left: 325,
    top: 190,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  button6: {
    ...baseStyles.gamepiece,
    left: 405,
    top: 190,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  button7: {
    ...baseStyles.gamepiece,
    left: 480,
    top: 200,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  button8: {
    ...baseStyles.gamepiece,
    left: 560,
    top: 230,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  button9: {
    ...baseStyles.gamepiece,
    left: 635,
    top: 230,
  },
  // eslint-disable-next-line react-native/no-unused-styles, react-native/sort-styles
  button10: {
    ...baseStyles.gamepiece,
    left: -5, // -18
    top: 200, // +70
  },
  // eslint-disable-next-line react-native/no-unused-styles
  button11: {
    ...baseStyles.gamepiece,
    left: 72,
    top: 220,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  button12: {
    ...baseStyles.gamepiece,
    left: 152,
    top: 220,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  button13: {
    ...baseStyles.gamepiece,
    left: 227,
    top: 240,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  button14: {
    ...baseStyles.gamepiece,
    left: 307,
    top: 260,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  button15: {
    ...baseStyles.gamepiece,
    left: 387,
    top: 260,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  button16: {
    ...baseStyles.gamepiece,
    left: 462,
    top: 270,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  button17: {
    ...baseStyles.gamepiece,
    left: 542,
    top: 300,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  button18: {
    ...baseStyles.gamepiece,
    left: 617,
    top: 300,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  button19: {
    ...baseStyles.gamepiece,
    left: -23, // -15
    top: 290, // +100
  },
  // eslint-disable-next-line react-native/no-unused-styles
  button20: {
    ...baseStyles.gamepiece,
    left: 51,
    top: 320,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  button21: {
    ...baseStyles.gamepiece,
    left: 131,
    top: 320,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  button22: {
    ...baseStyles.gamepiece,
    left: 208,
    top: 333,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  button23: {
    ...baseStyles.gamepiece,
    left: 285,
    top: 360,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  button24: {
    ...baseStyles.gamepiece,
    left: 365,
    top: 360,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  button25: {
    ...baseStyles.gamepiece,
    left: 445,
    top: 370,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  button26: {
    ...baseStyles.gamepiece,
    left: 522,
    top: 400,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  button27: {
    ...baseStyles.gamepiece,
    left: 602,
    top: 400,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  singleSubPressable: {
    ...styles.singleSub,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  doubleSubPressable: {
    ...styles.doubleSub,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  floorPressable: {
    ...styles.floor,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  singleSubImage: {
    ...baseStyles.gamepiece,
    left: 45,
    top: 90,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  doubleSubImage: {
    ...baseStyles.gamepiece,
    left: 100,
    top: 80,
  },
  // eslint-disable-next-line react-native/no-unused-styles
  floorImage: {
    ...baseStyles.gamepiece,
    left: 45,
    top: 90,
  },
});
