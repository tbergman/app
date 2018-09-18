import React from 'react';
import { Animated } from 'react-native';
import { Container } from 'constate';
import { Lifecycle } from '../Lifecycle';

import { AnimationContext } from './Context';

export const AnimationHandler = ({
  children,
  toValue,
  initialValue,
  getAnimation,
  mapStyles,
}) => (
  <Container initialState={{ animatedValue: new Animated.Value(initialValue) }}>
    {({ animatedValue }) => (
      <AnimationContext.Consumer>
        {({ addAnimation }) => (
          <Lifecycle
            toValue={toValue}
            mount={() => addAnimation(getAnimation(animatedValue))}
            willReceiveProps={(nextProps, prevProps) => {
              if (nextProps.toValue !== prevProps.toValue) {
                addAnimation(getAnimation(animatedValue));
              }
            }}
          >
            <Animated.View style={mapStyles(animatedValue)}>
              {children}
            </Animated.View>
          </Lifecycle>
        )}
      </AnimationContext.Consumer>
    )}
  </Container>
);
