import * as React from 'react';
import styled from '@sampettersson/primitives';
import { TouchableOpacity } from 'react-native';
import { BankID } from 'src/components/icons/BankID';
import { NavigationEvents } from 'src/navigation/events';

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

export const SignButton = (props) => (
  <NavigationEvents>
    {(triggerEvent) => (
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
);
