import * as React from 'react';
import { View, Text, AsyncStorage, Switch } from 'react-native';
import { Container, ActionMap } from 'constate';
import { Mount } from 'react-lifecycle-components';

import styled from '@sampettersson/primitives';
import { fonts, colors } from '@hedviginsurance/brand';
import { LAUNCH_DEBUG } from 'src/constants';

const setAlwaysOpenDebugScreen = (value: boolean) => {
  if (value) {
    AsyncStorage.setItem(LAUNCH_DEBUG, 'true');
  } else {
    AsyncStorage.removeItem(LAUNCH_DEBUG);
  }
};

const Label = styled(Text)({
  fontFamily: fonts.CIRCULAR,
  color: colors.BLACK,
  fontWeight: '500',
  fontSize: 16,
  maxWidth: '80%',
});

const SwitchContainer = styled(View)({
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: 20,
  paddingRight: 20,
  paddingBottom: 20,
  flexDirection: 'row',
  width: '100%',
});

interface State {
  isActive: boolean;
}

interface Actions {
  setIsActive: (isActive: boolean) => void;
}

const actions: ActionMap<State, Actions> = {
  setIsActive: (isActive) => () => ({
    isActive,
  }),
};

export const PersistentDebug = () => (
  <Container actions={actions} initialState={{ isActive: false }}>
    {({ isActive, setIsActive }) => (
      <>
        <Mount
          on={() =>
            AsyncStorage.getItem(LAUNCH_DEBUG).then((value) =>
              setIsActive(!!value),
            )
          }
        >
          {null}
        </Mount>
        <SwitchContainer>
          <Label>Always launch app with debug screen open?</Label>
          <Switch
            value={isActive}
            onValueChange={(value) => {
              setIsActive(value);
              setAlwaysOpenDebugScreen(value);
            }}
          />
        </SwitchContainer>
      </>
    )}
  </Container>
);
