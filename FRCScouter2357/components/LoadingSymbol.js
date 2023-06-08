import React from 'react';
import { Animated, Easing, Image, Text, View, StyleSheet } from 'react-native';

const LoadingSymbol = () => {
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

export default LoadingSymbol;

const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  gear: {
    width: 300,
    height: 300,
    position: 'absolute',
  },
  radioactiveSymbol: {
    width: 200,
    height: 200,
    position: 'relative',
   },
});
