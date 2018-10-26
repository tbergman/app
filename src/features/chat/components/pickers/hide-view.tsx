import * as React from 'react';
import { Animated, View, ViewProps } from 'react-native';
import { Parallel, Timing } from 'animated-react-native-components';
import styled from '@sampettersson/primitives';

const AnimatedView = Animated.createAnimatedComponent<ViewProps>(View);

const HideViewContainer = styled(AnimatedView)(
  ({
    hidden,
    animatedValue,
  }: {
    hidden: boolean;
    animatedValue: Animated.Value;
  }) => ({
    width: hidden ? 0 : 50,
    opacity: animatedValue,
  }),
);

interface HideViewProps {
  hidden: boolean;
}

export const HideView: React.SFC<HideViewProps> = ({ hidden, children }) => (
  <Parallel>
    <Timing
      toValue={hidden ? 0 : 1}
      initialValue={hidden ? 0 : 1}
      config={{ duration: 250 }}
    >
      {(animatedValue) => (
        <HideViewContainer
          pointerEvents={hidden ? 'none' : 'auto'}
          hidden={hidden}
          animatedValue={animatedValue}
        >
          {children}
        </HideViewContainer>
      )}
    </Timing>
  </Parallel>
);
