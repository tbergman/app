import * as React from 'react';
import styled from '@sampettersson/primitives';
import { View, LayoutAnimation, Animated } from 'react-native';
import { Mount } from 'react-lifecycle-components';
import { Delay, Timing, Sequence } from 'animated-react-native-components';

import { OpenState } from 'src/components/OpenState';
import { AnimatedView } from 'src/components/AnimatedPrimitives';

const HeightConstraint = styled(View)(({ visible }: { visible: boolean }) => ({
  maxHeight: visible ? 'auto' : 0,
  overflow: 'hidden',
}));

const FadeIn = styled(AnimatedView)(
  ({ animatedValue }: { animatedValue: Animated.Value }) => ({
    opacity: animatedValue,
  }),
);

export const MessageAnimation: React.SFC = ({ children }) => (
  <OpenState initialOpenState={false}>
    {({ isOpen, setIsOpen }) => (
      <>
        <Mount
          on={() => {
            setTimeout(() => {
              LayoutAnimation.configureNext({
                duration: 350,
                create: {
                  type: LayoutAnimation.Types.easeInEaseOut,
                  property: LayoutAnimation.Properties.opacity,
                },
                update: {
                  type: LayoutAnimation.Types.easeInEaseOut,
                  property: LayoutAnimation.Properties.opacity,
                },
                delete: {
                  type: LayoutAnimation.Types.easeInEaseOut,
                  property: LayoutAnimation.Properties.opacity,
                },
              });
              setIsOpen(true);
            }, 900);
          }}
        >
          {null}
        </Mount>
        <HeightConstraint visible={isOpen}>
          <Sequence>
            <Delay config={{ delay: 1000 }} />
            <Timing initialValue={0} toValue={1} config={{ duration: 250 }}>
              {(animatedValue) => (
                <FadeIn animatedValue={animatedValue}>{children}</FadeIn>
              )}
            </Timing>
          </Sequence>
        </HeightConstraint>
      </>
    )}
  </OpenState>
);
