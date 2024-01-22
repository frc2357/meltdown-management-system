import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { BarCodeReadEvent, RNCamera } from 'react-native-camera';

export const App: React.FC = () => {
  const onRead = (event: BarCodeReadEvent) => {
    console.log(`Data: ${event.data}`);

    console.log(`RAW DATA: ${event.rawData}`);
  };

  return (
    <View style={{ flex: 1 }}>
      <Text>Hello</Text>
      <RNCamera
        style={{ flex: 1 }}
        type={RNCamera.Constants.Type.front}
        flashMode={RNCamera.Constants.FlashMode.off}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        onBarCodeRead={onRead}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
