import { Stack, HStack } from '@react-native-material/core';
import React from 'react';
import { RadioButton } from 'react-native-paper';
import { FlexStyle } from 'react-native/types';

export type RadioButtonListProps = {
  labels: string[];
  direction?: FlexStyle['flexDirection'];
  position?: 'leading' | 'trailing';
  selected: string;
  setSelected: (value: string) => void;
};

export const RadioButtonList: React.FC<RadioButtonListProps> = ({
  labels,
  direction = 'column',
  position = 'trailing',
  selected,
  setSelected,
}: RadioButtonListProps) => {
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
};
