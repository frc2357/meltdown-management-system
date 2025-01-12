import React from 'react';
import { Pressable } from '@react-native-material/core';
import { Image } from 'react-native';
import { ImageStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

export type PGamepieceButton = {
  gamePieceSrc: number;
  isHidden: boolean;
  setHidden: (isHidden: boolean) => void;
  pressableStyle: Object;
  imageStyle: Object;
};

export function GamepieceButton({
  gamePieceSrc,
  isHidden,
  setHidden,
  pressableStyle = {},
  imageStyle,
}: PGamepieceButton): React.JSX.Element {
  const renderImage = () => {
    return isHidden ? (
      <></>
    ) : (
      // eslint-disable-next-line react-native/no-inline-styles
      <Image
        source={gamePieceSrc}
        style={
          {
            ...(imageStyle || { ...pressableStyle, position: 'relative', top: 0, left: 0 }),
          } as ImageStyle
        }
      />
    );
  };

  return (
    <>
      {renderImage()}
      <Pressable
        onPress={() => {
          setHidden(false);
        }}
        onLongPress={() => {
          setHidden(true);
        }}
        pressEffect="none"
        // eslint-disable-next-line react-native/no-inline-styles, react-native/no-color-literals
        style={{ ...pressableStyle, backgroundColor: 'rgba(255,0,0,0)' }}
      ></Pressable>
    </>
  );
}
