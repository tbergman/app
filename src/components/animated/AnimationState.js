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

const shouldUpdate = ({ state, nextState, setState }) => {
  if (state.isDefferingUpdate) {
    return false;
  }

  if (state.timestamp === nextState.timestamp) {
    setState({ isDefferingUpdate: true });
    window.requestAnimationFrame(() =>
      setState({ timestamp: new Date().toString(), isDefferingUpdate: false }),
    );
    return false;
  }

  return true;
};

export const AnimationState = ({ children }) => (
  <Container actions={actions} initialState={initialState}>
    {children}
  </Container>
);
