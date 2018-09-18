import React from 'react';
import { Animated } from 'react-native';

import { AnimationHandler } from './AnimationHandler';

export const Spring = ({
  children,
  bounciness,
  delay,
  mapStyles,
  toValue,
  initialValue,
}) => (
  <AnimationHandler
    toValue={toValue}
    getAnimation={(animatedValue) =>
      Animated.spring(animatedValue, {
        bounciness,
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
