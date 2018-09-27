import * as React from 'react';
import styled from '@sampettersson/primitives';
import { TouchableOpacity, ViewProps, Animated, View } from 'react-native';
import { BankID } from 'src/components/icons/BankID';
import { NavigationEvents } from 'src/navigation/events';
import { Delay, Timing, Sequence } from 'animated-react-native-components';

const AnimatedView = Animated.createAnimatedComponent<ViewProps>(View);

const ButtonContainer = styled(TouchableOpacity)({
  width: 50,
  height: 30,
  borderRadius: 20,
  backgroundColor: 'white',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  marginLeft: 20,
});

const FadeInView = styled(AnimatedView)(
  ({ animatedValue }: { animatedValue: Animated.Value }) => ({
    opacity: animatedValue,
  }),
);

export const SignButton: React.SFC = () => (
  <Sequence>
    <Delay config={{ delay: 500 }} />
    <Timing toValue={1} initialValue={0} config={{ duration: 500 }}>
      {(animatedValue) => (
        <FadeInView animatedValue={animatedValue}>
          <NavigationEvents>
            {(triggerEvent: (event: { id: string }) => void) => (
              <ButtonContainer
                onPress={() =>
                  triggerEvent({
                    id: 'SignButtonPressed',
                  })
                }
              >
                <BankID width={15} height={15} />
              </ButtonContainer>
            )}
          </NavigationEvents>
        </FadeInView>
      )}
    </Timing>
  </Sequence>
);
