import React from 'react';
import { Pressable } from '@react-native-material/core';
import { Image } from 'react-native';
import { ImageStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

export type PRobotState = {
  stateSrc: number;
  onDrop: () => void;
  isDroppable: boolean;
  style: ImageStyle;
};

export function RobotState({ stateSrc, onDrop, isDroppable, style }: PRobotState): React.JSX.Element {
    console
  return (
      <Pressable
        onPress={() => {
          onDrop();
        }}
        disabled={!isDroppable}
        pressEffect="ripple"
        pressEffectColor='rgba(0,0,0,0)'
        // eslint-disable-next-line react-native/no-inline-styles, react-native/no-color-literals
        style={{backgroundColor: 'rgba(0,0,0,0)' }}
      >
        <Image
          source={stateSrc}
          style={style}
          resizeMode='stretch'

        />
      </Pressable>
  );
}
