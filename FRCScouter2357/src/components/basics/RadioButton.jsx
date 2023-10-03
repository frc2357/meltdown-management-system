import { Pressable, HStack, Text } from '@react-native-material/core';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

RadioButton.propTypes = {
  label: PropTypes.string,
  isPressed: PropTypes.bool,
  onPress: PropTypes.func,
};

export default function RadioButton({ label, isPressed, onPress }) {
  return (
    <HStack>
      <Pressable
        style={{ ...styles.roundButton, backgroundColor: isPressed ? 'black' : 'white' }}
        onPress={() => {
          onPress(isPressed);
        }}
      />
      <Text>{label}</Text>
    </HStack>
  );
}

const styles = StyleSheet.create({
  roundButton: {
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 5,
    bordersColor: 'black',
    height: 100,
    justifyContent: 'center',
    padding: 10,
    width: 100,
  },
});
