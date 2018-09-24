import * as React from 'react';
import {
  Animated,
  ScrollView,
  ScrollViewProps,
  ViewStyle,
  View,
  ViewProps,
} from 'react-native';
import { PriceBubble } from 'src/features/new-offer/components/price-bubble';
import styled from '@sampettersson/primitives';
import { colors } from '@hedviginsurance/brand';
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

const FixedContainer = styled(AnimatedView)({
  alignItems: 'center',
});

export const NewOffer: React.SFC = () => (
  <>
    <AnimationValueProvider initialValue={0}>
      {({ animatedValue }) => (
        <ScrollContainer
          onScroll={Animated.event(
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
          )}
          scrollEventThrottle={1}
          contentContainerStyle={{
            alignItems: 'center',
          }}
        >
          <FixedContainer
            style={{
              transform: [
                {
                  translateY: Animated.divide(
                    animatedValue,
                    new Animated.Value(1.25),
                  ),
                },
              ],
            }}
          >
            <Spacing height={35} />
            <PriceBubble />
            <AnimatedView
              style={{
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
              }}
            >
              <FeaturesBubbles />
            </AnimatedView>
          </FixedContainer>
          <ScrollContent scrollAnimatedValue={animatedValue} />
        </ScrollContainer>
      )}
    </AnimationValueProvider>
    <Checkout />
  </>
);
