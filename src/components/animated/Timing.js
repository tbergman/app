import React from 'react';
import { Animated } from 'react-native';

import { AnimationHandler } from './AnimationHandler';

export const Timing = ({
  children,
  duration,
  delay,
  mapStyles,
  toValue,
  initialValue,
}) => (
  <AnimationHandler
    toValue={toValue}
    getAnimation={(animatedValue) =>
      Animated.timing(animatedValue, {
        duration,
        delay,
        toValue,
        useNativeDriver: true,
      })
    }
    mapStyles={mapStyles}
    initialValue={initialValue}
  >
    {children}
  </AnimationHandler>
);
