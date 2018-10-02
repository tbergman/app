import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, ActionMap } from 'constate';

import { SpeechBubbles } from 'src/components/icons/SpeechBubbles';
import { DraggableOverlay } from 'src/components/draggable-overlay';
import { Header } from 'src/components/draggable-overlay/header';
import OfferChat from 'src/features/chat/OfferChat';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { TranslationsConsumer } from 'src/components/translations/consumer';

interface State {
  open: boolean;
}

interface Actions {
  setOpen: (open: boolean) => void;
}

const actions: ActionMap<State, Actions> = {
  setOpen: (open) => () => ({
    open,
  }),
};

const OFFER_CLOSED_MUTATION = gql`
  mutation OfferClosed {
    offerClosed
  }
`;

export const ChatButton: React.SFC = () => (
  <Container actions={actions} initialState={{ open: false }}>
    {({ open, setOpen }) => (
      <Mutation mutation={OFFER_CLOSED_MUTATION}>
        {(mutate) => (
          <>
            <TouchableOpacity
              onPress={() => {
                mutate().then(() => {
                  setOpen(true);
                });
              }}
            >
              <SpeechBubbles height={25} width={25} />
            </TouchableOpacity>
            {open && (
              <DraggableOverlay
                heightPercentage={90}
                onClose={() => setOpen(false)}
              >
                {(handleClose) => (
                  <>
                    <TranslationsConsumer textKey="OFFER_CHAT_HEADER">
                      {(text) => (
                        <Header title={text} onCloseClick={handleClose} />
                      )}
                    </TranslationsConsumer>
                    <OfferChat onRequestClose={handleClose} />
                  </>
                )}
              </DraggableOverlay>
            )}
          </>
        )}
      </Mutation>
    )}
  </Container>
);
