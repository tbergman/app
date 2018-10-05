import * as React from 'react';
import { View, ViewProps, Text, Animated, Dimensions } from 'react-native';
import styled from '@sampettersson/primitives';
import { colors, fonts } from '@hedviginsurance/brand';
import { Sequence, Spring, Delay } from 'animated-react-native-components';

const AnimatedView = Animated.createAnimatedComponent<ViewProps>(View);

const LARGE_CIRCLE_SIZE = 180;
const SMALL_CIRCLE_SIZE = 125;

const getCircleSize = () => {
  const windowHeight = Dimensions.get('window').height;

  if (windowHeight < 700) {
    return SMALL_CIRCLE_SIZE;
  }

  return LARGE_CIRCLE_SIZE;
};

const Circle = styled(View)({
  height: getCircleSize(),
  width: getCircleSize(),
  borderRadius: getCircleSize() / 2,
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
  fontSize: getCircleSize() === LARGE_CIRCLE_SIZE ? 60 : 40,
  fontFamily: fonts.CIRCULAR,
});

const MonthlyLabel = styled(Text)({
  color: colors.BLACK,
  fontSize: getCircleSize() === LARGE_CIRCLE_SIZE ? 20 : 18,
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
