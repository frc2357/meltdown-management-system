import React from 'react';
import { Animated, Easing, Image, View, StyleSheet } from 'react-native';

export default function LoadingSymbol() {
  const spinValue = new Animated.Value(0);

  // First set up animation
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.view}>
      <Animated.Image
        style={{ transform: [{ rotate: spin,}], ...styles.gear }}
        source={require('../images/gear.png')}
      />
      <Image style={styles.radioactiveSymbol} source={require('../images/radioactive.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  gear: {
    height: 300,
    position: 'absolute',
    width: 300,
  },
  radioactiveSymbol: {
    height: 200,
    position: 'relative',
    width: 200,
   },
  view: {
    alignItems: 'center',
    justifyContent: 'center'
  },
});
