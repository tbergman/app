import * as React from 'react';
import {
  Animated,
  ScrollView,
  ScrollViewProps,
  View,
  ViewProps,
} from 'react-native';
import styled from '@sampettersson/primitives';
import { colors } from '@hedviginsurance/brand';

import { PriceBubble } from 'src/features/new-offer/components/price-bubble';
import { FeaturesBubbles } from 'src/features/new-offer/components/features-bubbles';
import { AnimationValueProvider } from 'src/components/animated';
import { Spacing } from 'src/components/Spacing';
import { ScrollContent } from 'src/features/new-offer/components/scroll-content';
import { Checkout } from 'src/features/new-offer/components/checkout';

const AnimatedScrollView = Animated.createAnimatedComponent<ScrollViewProps>(
  ScrollView,
);

const AnimatedView = Animated.createAnimatedComponent<ViewProps>(View);

const ScrollContainer = styled(AnimatedScrollView)({
  backgroundColor: colors.BLACK_PURPLE,
});

interface FixedContainerProps {
  animatedValue: Animated.Value;
}

const FixedContainer = styled(AnimatedView)(
  ({ animatedValue }: FixedContainerProps) => ({
    alignItems: 'center',
    transform: [
      {
        translateY: Animated.divide(animatedValue, new Animated.Value(1.25)),
      },
    ],
  }),
);

interface FeaturesContainer {
  animatedValue: Animated.Value;
}

const FeaturesContainer = styled(AnimatedView)(
  ({ animatedValue }: FeaturesContainer) => ({
    transform: [
      {
        translateY: Animated.divide(
          animatedValue,
          new Animated.Value(2),
        ).interpolate({
          inputRange: [-500, 0],
          outputRange: [180, 0],
          extrapolateRight: 'clamp',
        }),
      },
    ],
  }),
);

const getScrollHandler = (animatedValue) =>
  Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            y: animatedValue,
          },
        },
      },
    ],
    {
      useNativeDriver: true,
    },
  );

export const NewOffer: React.SFC = () => (
  <>
    <AnimationValueProvider initialValue={0}>
      {({ animatedValue }) => (
        <ScrollContainer
          onScroll={getScrollHandler(animatedValue)}
          scrollEventThrottle={1}
          contentContainerStyle={{
            alignItems: 'center',
          }}
        >
          <FixedContainer animatedValue={animatedValue}>
            <Spacing height={35} />
            <PriceBubble />
            <FeaturesContainer animatedValue={animatedValue}>
              <FeaturesBubbles />
            </FeaturesContainer>
          </FixedContainer>
          <ScrollContent scrollAnimatedValue={animatedValue} />
        </ScrollContainer>
      )}
    </AnimationValueProvider>
    <Checkout />
  </>
);
