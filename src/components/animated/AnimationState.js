import React from 'react';
import { Container } from '@sampettersson/constate';
import { without } from 'ramda';

const initialState = {
  animations: [],
};

const actions = {
  addAnimation: (animation) => (state) => ({
    animations: [...state.animations, animation],
  }),
  removeAnimations: (animations) => (state) => ({
    animations: without(animations, state.animations),
  }),
};

export const AnimationState = ({ children }) => (
  <Container actions={actions} initialState={initialState}>
    {children}
  </Container>
);
