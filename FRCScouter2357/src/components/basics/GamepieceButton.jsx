import React from 'react';
import { Pressable } from '@react-native-material/core';
import { Image } from 'react-native';

export default function GamepieceButton({ gamepiece, isHidden, setHidden, style = {} }) {
  const renderImage = () => {
    return isHidden ? <></> : <Image source={gamepiece} style={style} />;
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
      style={{ ...style, backgroundColor: 'rgba(0,0,0,0)' }}
    >
      {renderImage()}
    </Pressable>
  );
}
