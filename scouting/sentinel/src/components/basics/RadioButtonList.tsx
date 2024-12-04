import { Stack, HStack } from '@react-native-material/core';
import React from 'react';
import { FlexStyle } from 'react-native';
import { RadioButton } from 'react-native-paper';

export type PRadioButtonList = {
  labels: string[];
  direction?: FlexStyle['flexDirection'];
  position?: 'leading' | 'trailing';
  selected: string;
  setSelected: (value: string) => void;
};

export function RadioButtonList({
  labels,
  direction = 'column',
  position = 'trailing',
  selected,
  setSelected,
}: PRadioButtonList): React.JSX.Element {
  return (
    <RadioButton.Group onValueChange={(newValue) => setSelected(newValue)} value={selected}>
      <Stack direction={direction}>
        {labels.map((label, i) => {
          return (
            <HStack key={label}>
              <RadioButton.Item label={label} value={label} position={position} />
            </HStack>
          );
        })}
      </Stack>
    </RadioButton.Group>
  );
}
