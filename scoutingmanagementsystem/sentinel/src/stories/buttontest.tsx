// button.component.tsx

import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps,
} from '@mui/material';

type ButtonBaseProps = Pick<MuiButtonProps, 'variant' | 'size' | 'color'>;
 
export interface ButtonProps extends ButtonBaseProps {
  label: string;
}

export const ButtonTest = ({ label, ...rest }: ButtonProps) => <MuiButton {...rest}>{label}</MuiButton>;