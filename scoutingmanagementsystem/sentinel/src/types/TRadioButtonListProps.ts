//import { FlexStyle } from 'react-native/types';

export type TRadioButtonListProps = {
  labels: string[];
  direction?: any;
  position?: 'leading' | 'trailing';
  selected: string;
  setSelected: (value: string) => void;
};
