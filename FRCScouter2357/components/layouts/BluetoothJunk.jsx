import React, { useState, useEffect } from 'react';
import { Box, Button, HStack } from '@react-native-material/core';
import { Image, StyleSheet, Platform } from 'react-native';
import AutoDialog from '../screens/AutoScreen';
import RNBluetoothClassic from 'react-native-bluetooth-classic';

export default function TeleopLayout() {
  const [autoVisible, setAutoVisible] = useState(false);

  const [paired, setPaired] = useState([]);

  useEffect(() => {
    RNBluetoothClassic.getBondedDevices().then((devices) => {
      console.log(devices);
      setPaired(devices);
    });
  }, []);

  return (
    <Box>
      <HStack spacing={6} style={styles.buttonStack}>
        <Button
          variant="contained"
          title="Auto"
          onPress={() => {
            paired[0]
              .write('Hello max\n', 'ascii')
              .then((success) => {
                console.log('Success: ' + success);
              })
              .catch((error) => {
                console.log('failure' + error);
              });
          }}
        />
        <Button
          variant="contained"
          title="Drop"
          onPress={() => {
            paired[0]
              .connect({
                CONNECTOR_TYPE: 'rfcomm',
                DELIMITER: '\n',
                DEVICE_CHARSET: Platform.OS === "ios" ? 1536 : "utf-8",
                READ_TIMEOUT: 300,
                SECURE_SOCKET: true,
              })
              .then((connected) => {
                if (connected) {
                  console.log('Device connected');
                  paired[0].onDataReceived((data) => {
                    console.log(data);
                  });
                } else {
                  console.log('Device not connected ');
                }
              });
          }}
        />
        <Button
          variant="contained"
          title="Endgame"
          onPress={() => {
            paired[0].isConnected().then((connected) => {
              console.log(connected);
            });

            paired[0].available().then((messages) => {
              if (messages.length > 0) {
                console.log('Message available');
                paired[0]
                  .read()
                  .then((message) => {
                    console.log('Printing: ' + message);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else {
                console.log('Nothing available');
              }
            });
          }}
        />
        {console.log(JSON.stringify(paired))}
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
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  buttonStack: {
    alignItems: 'center',
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
  singleSub: {
    height: 230,
    left: 857.5,
    position: 'absolute',
    top: 255,
    width: 167.5,
  },
});
