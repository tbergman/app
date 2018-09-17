import * as React from 'react';
import { View, Text } from 'react-native';
import styled from '@sampettersson/primitives';
import { colors, fonts } from '@hedviginsurance/brand';

const Circle = styled(View)({
  height: 180,
  width: 180,
  borderRadius: 100,
  backgroundColor: colors.WHITE,
  alignItems: 'center',
  justifyContent: 'center',
});

const Price = styled(Text)({
  color: colors.BLACK,
  fontSize: 60,
  fontFamily: fonts.CIRCULAR,
});

const MonthlyLabel = styled(Text)({
  color: colors.BLACK,
  fontSize: 20,
  fontFamily: fonts.CIRCULAR,
});

export const PriceBubble: React.SFC = () => (
  <Circle>
    <Price>279</Price>
    <MonthlyLabel>kr/mån</MonthlyLabel>
  </Circle>
);
