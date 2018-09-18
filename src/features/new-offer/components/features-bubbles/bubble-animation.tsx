import * as React from 'react';
import { Spring } from 'src/components/animated';

interface BubbleAnimationProps {
  delay: number;
}

export const BubbleAnimation: React.SFC<BubbleAnimationProps> = ({
  children,
  delay,
}) => (
  <Spring
    delay={650 + delay}
    bounciness={5}
    toValue={0}
    initialValue={-30}
    mapStyles={(animatedValue) => ({
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
    })}
  >
    {children}
  </Spring>
);
