import * as React from 'react';
import { Text, View } from 'react-native';
import styled from '@sampettersson/primitives';
import { colors, fonts } from '@hedviginsurance/brand';

import { CircledExclamationMark } from 'src/components/icons/CircledExclamationMark';
import { TranslationsConsumer } from 'src/components/translations/consumer';
import { DialogButton } from 'src/components/Button';
import { Spacing } from 'src/components/Spacing';
import { OpenState } from 'src/components/OpenState';
import { NavigationEvents } from 'src/navigation/events';

import { Picker } from './picker';
import { Update } from 'react-lifecycle-components';

const MessageText = styled(Text)({
  color: colors.BLACK,
  fontFamily: fonts.CIRCULAR,
  fontSize: 16,
  maxWidth: 280,
  textAlign: 'center',
});

const MessageContainer = styled(View)({
  maxHeight: 50,
});

const ButtonContainer = styled(View)({
  maxHeight: 40,
});

export const SelectCashback = () => (
  <OpenState initialOpenState={false}>
    {({ isOpen, setIsOpen }) => (
      <>
        <NavigationEvents>
          {(triggerEvent: (event: { name: string }) => void) => (
            <Update
              watched={isOpen}
              was={() =>
                triggerEvent({ name: isOpen ? 'showModal' : 'dismissModal' })
              }
            >
              {null}
            </Update>
          )}
        </NavigationEvents>
        <CircledExclamationMark width={30} height={30} />
        <Spacing height={20} />
        <MessageContainer>
          <TranslationsConsumer textKey="CASHBACK_NEEDS_SETUP_MESSAGE">
            {(text) => <MessageText>{text}</MessageText>}
          </TranslationsConsumer>
          <ButtonContainer>
            <TranslationsConsumer textKey="CASHBACK_NEEDS_SETUP_ACTION">
              {(text) => (
                <DialogButton title={text} onPress={() => setIsOpen(true)} />
              )}
            </TranslationsConsumer>
          </ButtonContainer>
        </MessageContainer>
        {isOpen && <Picker close={() => setIsOpen(false)} />}
        <Spacing height={20} />
      </>
    )}
  </OpenState>
);
