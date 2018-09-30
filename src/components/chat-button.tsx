import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, ActionMap } from 'constate';

import { SpeechBubbles } from 'src/components/icons/SpeechBubbles';
import { DraggableOverlay } from 'src/components/draggable-overlay';
import { Header } from 'src/components/draggable-overlay/header';
import OfferChat from 'src/features/chat/OfferChat';

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

export const ChatButton: React.SFC = () => (
  <Container actions={actions} initialState={{ open: false }}>
    {({ open, setOpen }) => (
      <>
        <TouchableOpacity onPress={() => setOpen(true)}>
          <SpeechBubbles height={25} width={25} />
        </TouchableOpacity>
        {open && (
          <DraggableOverlay
            heightPercentage={90}
            onClose={() => setOpen(false)}
          >
            {(handleClose) => (
              <>
                <Header title="Prata med hedvig" onCloseClick={handleClose} />
                <OfferChat />
              </>
            )}
          </DraggableOverlay>
        )}
      </>
    )}
  </Container>
);
