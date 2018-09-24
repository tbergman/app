import * as React from 'react';
import styled from '@sampettersson/primitives';
import { View, ViewStyle, Animated } from 'react-native';
import { colors } from '@hedviginsurance/brand';
import { Arrow } from 'src/components/icons/Arrow';
import { Spacing } from 'src/components/Spacing';
import { Parallel, Spring, Delay } from 'animated-react-native-components';

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

const ScrollContentContainer = styled(AnimatedView)(
  ({ translateY }: { translateY: Animated.Value }) => ({
    width: '100%',
    alignItems: 'center',
    transform: [{ translateY }],
  }),
);

const ArrowContainer = styled(AnimatedView)(
  ({ scrollAnimatedValue }: { scrollAnimatedValue: Animated.Value }) => ({
    opacity: scrollAnimatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
  }),
);

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
        <ScrollContentContainer translateY={translateY}>
          <ArrowContainer scrollAnimatedValue={scrollAnimatedValue}>
            <Arrow arrowFill={colors.WHITE} width={20} height={20} />
          </ArrowContainer>
          <Spacing height={20} />
          <Content>
            <Header />
            <OfferScreen2 />
            <OfferScreen3 />
            <OfferScreen4 />
          </Content>
        </ScrollContentContainer>
      )}
    </Spring>
  </Parallel>
);
