import { Stack } from '@react-native-material/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RadioButton from './RadioButton';

RadioButtonList.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string),
  direction: PropTypes.string,
};

export default function RadioButtonList({ labels, direction = 'column' }) {
  const [pressed, setPressed] = useState(new Array(labels.length).fill(false));

  return (
    <Stack direction={direction}>
      {labels.map((label, i) => {
        return (
          <RadioButton
            key={label}
            label={label}
            isPressed={pressed[i]}
            onPress={() => {
              const newArr = new Array(labels.length).fill(false);
              newArr[i] = true;
              setPressed(newArr);
            }}
          />
        );
      })}
    </Stack>
  );
}
