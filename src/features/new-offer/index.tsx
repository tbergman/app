import * as React from 'react';
import { Animated, View } from 'react-native';
import { PriceBubble } from 'src/features/new-offer/components/price-bubble';
import styled from '@sampettersson/primitives';
import { colors } from '@hedviginsurance/brand';
import { FeaturesBubbles } from 'src/features/new-offer/components/features-bubbles';
import { AnimationValue } from 'src/components/animated/AnimationValue';
import { Spacing } from 'src/components/Spacing';
import { ScrollContent } from 'src/features/new-offer/components/scroll-content';

const ScrollContainer = styled(Animated.ScrollView)({
  backgroundColor: colors.LIGHT_GRAY,
});

const FixedContainer = styled(Animated.View)({
  alignItems: 'center',
});

const DummyWhiteView = styled(View)({
  backgroundColor: colors.WHITE,
  height: 2000,
  width: '100%',
  shadowColor: 'black',
  shadowOpacity: 0.1,
  shadowRadius: 20,
  shadowOffset: {
    height: -5,
  },
});

export const NewOffer: React.SFC = () => (
  <AnimationValue initialValue={0}>
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
          <Animated.View
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
          </Animated.View>
        </FixedContainer>
        <ScrollContent />
      </ScrollContainer>
    )}
  </AnimationValue>
);
