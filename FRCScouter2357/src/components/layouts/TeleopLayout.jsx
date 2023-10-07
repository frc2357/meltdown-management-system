import React, { useState } from 'react';
import { Box, Button, HStack } from '@react-native-material/core';
import { Image, StyleSheet } from 'react-native';
import cone from '../../images/cone.png';
import cube from '../../images/cube.png';
import empty from '../../images/empty.png'
import GamepieceButton from '../basics/GamepieceButton';

export default function TeleopLayout({ navigation }) {
  const [robotState, setRobotState] = useState(empty);
  const [isHidden, setHidden] = useState(false);
  return (
    <Box>
      <HStack spacing={6} style={styles.buttonStack}>
        <Button
          variant="contained"
          title="Auto"
          onPress={() => navigation.navigate('AutoScreen')}
        />
        <Button variant="contained" title="Drop" />
        <Button
          variant="contained"
          title="Endgame"
          onPress={() => navigation.navigate('EndgameScreen')}
        />
        <Image style={styles.robotState} alt="robotState" source={robotState} />
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

        <GamepieceButton style={styles.buttonOne} gamepiece={cone} isHidden={isHidden} setHidden={setHidden}/>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  buttonOne: {
    height: 100,
    width: 100,
    position: 'absolute',
    top: 0,
    left: 0,
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
    width: 680,
  },
  doubleSub: {
    height: 250,
    left: 685,
    position: 'absolute',
    top: 0,
    width: 340,
  },
  floor: {
    height: 230,
    left: 685,
    position: 'absolute',
    top: 255,
    width: 167.5,
  },
  robotState: {
    height: 50,
    width: 50,
  },
  singleSub: {
    height: 230,
    left: 857.5,
    position: 'absolute',
    top: 255,
    width: 167.5,
  },
});
