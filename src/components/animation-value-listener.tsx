import * as React from 'react';
import { Container, ActionMap } from 'constate';
import { Animated } from 'react-native';
import { Mount } from 'react-lifecycle-components';

interface State {
  isActive: boolean;
}

interface Actions {
  setActive: (isActive: boolean) => void;
}

const actions: ActionMap<State, Actions> = {
  setActive: (isActive) => () => ({
    isActive,
  }),
};

interface AnimationValueListenerProps {
  animatedValue: Animated.Value;
  testValue: (value: number) => boolean;
  children: (isActive: boolean) => React.ReactNode;
}

export const AnimationValueListener: React.SFC<AnimationValueListenerProps> = ({
  children,
  animatedValue,
  testValue,
}) => (
  <Container actions={actions} initialState={{ isActive: false }}>
    {({ isActive, setActive }) => (
      <>
        <Mount
          on={() =>
            animatedValue.addListener(({ value }) => {
              const shouldBecomeActive = testValue(value);
              requestAnimationFrame(() => {
                setActive(shouldBecomeActive);
              });
            })
          }
        >
          {children(isActive)}
        </Mount>
      </>
    )}
  </Container>
);
