import React from 'react';
import { Animated } from 'react-native';
import { Lifecycle } from '../Lifecycle';

import { AnimationContext } from './Context';
import { AnimationState } from './AnimationState';

export const Sequence = ({ children }) => (
  <AnimationState>
    {({ addAnimation, removeAnimations, animations }) => (
      <Lifecycle
        animations={animations}
        willReceiveProps={(nextProps) => {
          if (nextProps.animations.length !== 0) {
            Animated.sequence(nextProps.animations).start(() => {
              removeAnimations(nextProps.animations);
            });
          }
        }}
      >
        <AnimationContext.Provider value={{ addAnimation }}>
          {children}
        </AnimationContext.Provider>
      </Lifecycle>
    )}
  </AnimationState>
);
