import * as React from 'react';
import styled from '@sampettersson/primitives';
import { TouchableOpacity, ViewProps, Animated, View } from 'react-native';
import { BankID } from 'src/components/icons/BankID';
import { NavigationEvents } from 'src/navigation/events';
import { Delay, Timing, Sequence } from 'animated-react-native-components';
import { Container, ActionMap } from 'constate';

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

interface State {
  show: boolean;
}

interface Actions {
  setShow: (show: boolean) => void;
}

const actions: ActionMap<State, Actions> = {
  setShow: (show) => () => ({
    show,
  }),
};

export const SignButton: React.SFC = () => (
  <Container actions={actions} initialState={{ show: true }}>
    {({ show, setShow }) => (
      <Sequence>
        <Delay config={{ delay: 500 }} />
        <Timing
          toValue={show ? 1 : 0}
          initialValue={0}
          config={{ duration: 250 }}
        >
          {(animatedValue) => (
            <FadeInView animatedValue={animatedValue}>
              <NavigationEvents
                onGlobalEvent={(event: { id: string }) => {
                  if (event.id === 'HideSignButton') {
                    setShow(false);
                  } else if (event.id === 'ShowSignButton') {
                    setShow(true);
                  }
                }}
              >
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
    )}
  </Container>
);
