import React from 'react';
import { View } from 'react-native';
import LoadingSymbol from '../../../components/LoadingSymbol';

const MyButtonMeta = {
  title: 'LoadingSymbol',
  component: LoadingSymbol,
  argTypes: {
    onPress: { action: 'pressed the button' },
  },
  args: {
    text: 'Hello world',
  }, 
};

export default MyButtonMeta;

export const Basic = {};
