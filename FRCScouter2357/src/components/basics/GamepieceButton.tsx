import React from 'react';
import { Pressable } from '@react-native-material/core';
import { Image, ImageSourcePropType } from 'react-native';
import { ImageStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

export type TGamepieceButtonProps = {
  gamePieceSrc: ImageSourcePropType;
  isHidden: boolean;
  setHidden: (isHidden: boolean) => void;
  style: Object;
  imageStyle: Object;
};

export const GamepieceButton: React.FC<TGamepieceButtonProps> = ({
  gamePieceSrc: gamepiece,
  isHidden,
  setHidden,
  style = {},
  imageStyle,
}) => {
  const renderImage = () => {
    return isHidden ? (
      <></>
    ) : (
      // eslint-disable-next-line react-native/no-inline-styles
      <Image
        source={gamepiece}
        style={
          { ...(imageStyle || { ...style, position: 'relative', top: 0, left: 0 }) } as ImageStyle
        }
      />
    );
  };

  return (
    <Pressable
      onPress={() => {
        setHidden(false);
      }}
      onLongPress={() => {
        setHidden(true);
      }}
      pressEffect="none"
      // eslint-disable-next-line react-native/no-inline-styles, react-native/no-color-literals
      style={{ ...style, backgroundColor: 'rgba(0,0,0,0)' }}
    >
      {renderImage()}
    </Pressable>
  );
};
