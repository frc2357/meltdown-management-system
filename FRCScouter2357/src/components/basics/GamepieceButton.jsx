import React from 'react';
import { Pressable } from '@react-native-material/core';
import { Image } from 'react-native';
import PropTypes from 'prop-types';

GamepieceButton.propTypes = {
  gamepiece: PropTypes.number.isRequired,
  isHidden: PropTypes.bool.isRequired,
  setHidden: PropTypes.func.isRequired,
  style: PropTypes.object,
  imageStyle: PropTypes.object,
};

export default function GamepieceButton({
  gamepiece,
  isHidden,
  setHidden,
  style = {},
  imageStyle,
}) {
  const renderImage = () => {
    return isHidden ? (
      <></>
    ) : (
      // eslint-disable-next-line react-native/no-inline-styles
      <Image
        source={gamepiece}
        style={{ ...(imageStyle || { ...style, position: 'relative', top: 0, left: 0 }) }}
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
}
