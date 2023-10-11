import { Stack, Text, HStack } from '@react-native-material/core';
import React from 'react';
import PropTypes from 'prop-types';
import { RadioButton } from 'react-native-paper';

RadioButtonList.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string),
  direction: PropTypes.string,
  selected: PropTypes.string,
  setSelected: PropTypes.func
};

export default function RadioButtonList({ labels, direction = 'column', selected, setSelected }) {
  return (
    <RadioButton.Group
      direction={direction}
      onValueChange={(newValue) => setSelected(newValue)}
      value={selected}
    >
      <Stack direction={direction}>
        {labels.map((label, i) => {
          return (
            <HStack key={label}>
              <RadioButton value={label} />
              <Text>{label}</Text>
            </HStack>
          );
        })}
      </Stack>
    </RadioButton.Group>
  );
}
