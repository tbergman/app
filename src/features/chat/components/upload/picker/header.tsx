import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styled from '@sampettersson/primitives';
import { colors } from '@hedviginsurance/brand';
import { View } from 'react-native';

import { Spacing } from 'src/components/Spacing';

const HeaderContainer = styled(View)({
  padding: 10,
  paddingRight: 0,
  flexDirection: 'column',
});

const PickerButton = styled(TouchableOpacity)({
  width: 110,
  height: 110,
  backgroundColor: colors.DARK_GRAY,
  borderRadius: 10,
});

export const Header = () => (
  <HeaderContainer>
    <PickerButton />
    <Spacing height={10} />
    <PickerButton />
  </HeaderContainer>
);
