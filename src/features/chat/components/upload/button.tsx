import * as React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Consumer } from './context';
import styled from '@sampettersson/primitives';
import { colors } from '@hedviginsurance/brand';

const Button = styled(TouchableOpacity)({
  width: 40,
  height: 40,
  backgroundColor: colors.PURPLE,
  borderRadius: 20,
  marginRight: 10,
});

export const UploadButton = () => (
  <Consumer>
    {({ setIsOpen, isOpen }) => <Button onPress={() => setIsOpen(!isOpen)} />}
  </Consumer>
);
