import * as React from 'react';
import { View, Text } from 'react-native';
import styled from '@sampettersson/primitives';
import { colors, fonts } from '@hedviginsurance/brand';
import { Parallel, Spring } from 'src/components/animated';

const Circle = styled(View)({
  height: 180,
  width: 180,
  borderRadius: 100,
  backgroundColor: colors.WHITE,
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: 'black',
  shadowOpacity: 0.05,
  shadowOffset: {
    width: 0,
    height: 2,
  },
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
  <Parallel>
    <Spring
      bounciness={12}
      delay={500}
      toValue={1}
      initialValue={0.5}
      mapStyles={(animatedValue) => ({
        opacity: animatedValue.interpolate({
          inputRange: [0.5, 1],
          outputRange: [0, 1],
        }),
        transform: [{ scale: animatedValue }],
      })}
    >
      <Circle>
        <Price>279</Price>
        <MonthlyLabel>kr/mån</MonthlyLabel>
      </Circle>
    </Spring>
  </Parallel>
);
