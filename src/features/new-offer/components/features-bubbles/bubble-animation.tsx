import * as React from 'react';
import { Spring, Delay, Sequence } from 'src/components/animated';
import { Animated } from 'react-native';

interface BubbleAnimationProps {
  delay: number;
}

export const BubbleAnimation: React.SFC<BubbleAnimationProps> = ({
  children,
  delay,
}) => (
  <Sequence>
    <Delay config={{ delay: 650 + delay }} />
    <Spring config={{ bounciness: 5 }} toValue={0} initialValue={-30}>
      {(animatedValue) => (
        <Animated.View
          style={{
            opacity: animatedValue.interpolate({
              inputRange: [-30, 0],
              outputRange: [0, 1],
            }),
            transform: [
              {
                translateY: animatedValue,
              },
              {
                scale: animatedValue.interpolate({
                  inputRange: [-30, 0],
                  outputRange: [0, 1],
                }),
              },
            ],
          }}
        >
          {children}
        </Animated.View>
      )}
    </Spring>
  </Sequence>
);
