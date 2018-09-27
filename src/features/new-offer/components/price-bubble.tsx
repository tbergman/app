import * as React from 'react';
import { View, ViewProps, Text, Animated } from 'react-native';
import styled from '@sampettersson/primitives';
import { colors, fonts } from '@hedviginsurance/brand';
import {
  Sequence,
  Spring,
  Delay,
  Gate,
} from 'animated-react-native-components';

const AnimatedView = Animated.createAnimatedComponent<ViewProps>(View);

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

interface PriceBubbleProps {
  price: number;
}

export const PriceBubble: React.SFC<PriceBubbleProps> = ({ price }) => (
  <Sequence>
    <Delay config={{ delay: 650 }} />
    <Spring
      config={{
        bounciness: 12,
      }}
      toValue={1}
      initialValue={0.5}
    >
      {(animatedValue) => (
        <AnimatedView
          style={{
            opacity: animatedValue.interpolate({
              inputRange: [0.5, 1],
              outputRange: [0, 1],
            }),
            transform: [{ scale: animatedValue }],
          }}
        >
          <Circle>
            <Price>{price}</Price>
            <MonthlyLabel>kr/mån</MonthlyLabel>
          </Circle>
        </AnimatedView>
      )}
    </Spring>
  </Sequence>
);
