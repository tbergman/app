import * as React from 'react';
import styled from '@sampettersson/primitives';
import { View, Text } from 'react-native';
import { colors, fonts } from '@hedviginsurance/brand';

const HeaderContainer = styled(View)({
  backgroundColor: colors.PURPLE,
  height: 50,
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
});

const Heading = styled(Text)({
  fontSize: 18,
  fontFamily: fonts.CIRCULAR,
  fontWeight: '700',
  color: colors.WHITE,
});

export const Header: React.SFC = () => (
  <HeaderContainer>
    <Heading>Läs allt om skyddet nedan</Heading>
  </HeaderContainer>
);
