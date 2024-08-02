// button.component.tsx

import React, { useRef } from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps,
} from '@mui/material';

type ButtonBaseProps = Pick<MuiButtonProps, 'variant' | 'size' | 'color'>;
 
export interface ButtonProps extends ButtonBaseProps {
  label: string;
}



export const ButtonTest = ({ label, ...rest }: ButtonProps) =>
{
  const intervalRef = useRef<NodeJS.Timeout>();
  const cleared = useRef<boolean>(false);

  function click() {
    console.log("Clicked")
  }

  function longClick() {
    console.log("Long click")
    cleared.current = true;
  }

  function onDown() {
    console.log("down")
    intervalRef.current = setTimeout(longClick, 1500);
  }

  function onUp() {
    if(intervalRef.current) {
      clearTimeout(intervalRef.current);
    }
    if(!cleared.current) {
      click();
    }
    cleared.current = false;
  }

return(<MuiButton {...rest} onMouseDown={onDown} onMouseUp={onUp}>{label}</MuiButton>)};