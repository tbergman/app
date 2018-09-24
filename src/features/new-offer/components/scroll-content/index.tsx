import * as React from 'react';
import styled from '@sampettersson/primitives';
import { View, ViewStyle, Animated } from 'react-native';
import { colors } from '@hedviginsurance/brand';
import { Arrow } from 'src/components/icons/Arrow';
import { Spacing } from 'src/components/Spacing';
import { Parallel, Spring, Delay } from 'src/components/animated';

import OfferScreen2 from 'src/features/offer/containers/screens/OfferScreen2';
import OfferScreen3 from 'src/features/offer/containers/screens/OfferScreen3';
import OfferScreen4 from 'src/features/offer/containers/screens/OfferScreen4';

import { Header } from './header';

const Content = styled(View)({
  backgroundColor: colors.WHITE,
  width: '100%',
  shadowColor: colors.BLACK,
  shadowOpacity: 0.1,
  shadowRadius: 20,
  shadowOffset: {
    height: -5,
    width: 0,
  },
});

const AnimatedView = Animated.createAnimatedComponent<ViewStyle>(View);

interface ScrollContentProps {
  scrollAnimatedValue: Animated.Value;
}

export const ScrollContent: React.SFC<ScrollContentProps> = ({
  scrollAnimatedValue,
}) => (
  <Parallel>
    <Delay config={{ delay: 950 }} />
    <Spring
      config={{
        bounciness: 5,
      }}
      toValue={0}
      initialValue={150}
    >
      {(translateY) => (
        <AnimatedView
          style={{
            width: '100%',
            alignItems: 'center',
            transform: [{ translateY: translateY }],
          }}
        >
          <AnimatedView
            style={{
              opacity: scrollAnimatedValue.interpolate({
                inputRange: [0, 100],
                outputRange: [1, 0],
                extrapolate: 'clamp',
              }),
            }}
          >
            <Arrow arrowFill={colors.WHITE} width={20} height={20} />
          </AnimatedView>
          <Spacing height={20} />
          <Content>
            <Header />
            <OfferScreen2 />
            <OfferScreen3 />
            <OfferScreen4 />
          </Content>
        </AnimatedView>
      )}
    </Spring>
  </Parallel>
);
