import React from 'react';
import { Container } from 'constate';
import { Animated } from 'react-native';

export const AnimationValue = ({ children, initialValue }) => (
  <Container initialState={{ animatedValue: new Animated.Value(initialValue) }}>
    {children}
  </Container>
);
