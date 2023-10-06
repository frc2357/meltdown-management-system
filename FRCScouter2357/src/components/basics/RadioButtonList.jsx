import { Stack, Text, HStack } from '@react-native-material/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RadioButton } from 'react-native-paper';

RadioButtonList.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string),
  direction: PropTypes.string,
};

export default function RadioButtonList({ labels, direction = 'column' }) {
  const [value, setValue] = useState(labels[0]);

  return (
    <RadioButton.Group
      direction={direction}
      onValueChange={(newValue) => setValue(newValue)}
      value={value}
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
