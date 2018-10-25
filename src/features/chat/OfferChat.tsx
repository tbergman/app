import * as React from 'react';
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import { View, AppState, KeyboardAvoidingView } from 'react-native';
import styled from '@sampettersson/primitives';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { Mount, Update, Unmount } from 'react-lifecycle-components';
import { Container, EffectMap, EffectProps } from 'constate';

import MessageList from './containers/MessageList';
import InputComponent from './components/InputComponent';
import { Loader } from '../../components/Loader';
import { chatActions } from '../../../hedvig-redux';
import * as selectors from './state/selectors';

import Dialog from 'src/containers/Dialog';

import { Message } from './types';

interface ChatProps {
  onboardingDone: boolean;
  intent: string;
  messages: Array<Message>;
  getAvatars: () => void;
  getMessages: (intent: string) => void;
  resetConversation: () => void;
  onRequestClose: () => void;
}

interface State {
  longPollTimeout: number | null;
}

const initialState: State = {
  longPollTimeout: null,
};

interface Effects {
  startPolling: (
    getMessages: ((intent: string) => void),
    intent: string,
  ) => void;
  stopPolling: () => void;
}

const effects: EffectMap<State, Effects> = {
  startPolling: (getMessages, intent) => ({
    setState,
    state,
  }: EffectProps<State>) => {
    if (!state.longPollTimeout) {
      setState((state: any) => ({
        longPollTimeout: setInterval(() => {
          getMessages(intent);
        }, 15000),
      }));
    }
  },
  stopPolling: () => ({ setState, state }: EffectProps<State>) => {
    if (state.longPollTimeout) {
      clearInterval(state.longPollTimeout);
      setState((state: any) => ({
        longPollTimeout: null,
      }));
    }
  },
};

const KeyboardAvoid = styled(KeyboardAvoidingView)({
  flex: 1,
  ...ifIphoneX(
    {
      marginBottom: 20,
    },
    {
      marginBottom: 0,
    },
  ),
});

const Messages = styled(View)({
  flex: 1,
  alignSelf: 'stretch',
  paddingLeft: 16,
  paddingRight: 16,
});

const Response = styled(View)({
  alignItems: 'stretch',
  paddingTop: 8,
});

const handleAppStateChange = (
  appState: string,
  getMessages: (intent: string) => void,
  intent: string,
) => {
  if (appState === 'active') {
    getMessages(intent);
  }
};

const showOffer = (stopPolling: () => void, props: any) => {
  stopPolling();
  props.onRequestClose();
};

const Chat: React.SFC<ChatProps> = ({
  intent,
  messages,
  getAvatars,
  getMessages,
}) => {
  return (
    <Container effects={effects} initialState={initialState}>
      {({ startPolling, stopPolling }) => (
        <>
          <Mount
            on={() => {
              getMessages(intent);
              getAvatars();
              AppState.addEventListener('change', (appState) => {
                handleAppStateChange(appState, getMessages, intent);
              });
              startPolling(getMessages, intent);
            }}
          />
          <Update
            was={() => {
              startPolling(getMessages, intent);
            }}
            watched={messages}
          />
          <Unmount
            on={() => {
              AppState.addEventListener('change', (appState) => {
                handleAppStateChange(appState, getMessages, intent);
              });
              stopPolling();
            }}
          />

          <KeyboardAvoid
            keyboardVerticalOffset={ifIphoneX ? 90 : 70}
            behavior="padding"
            enabled={Platform.OS === 'ios'}
          >
            <Messages>
              {messages.length ? (
                <MessageList showOffer={showOffer} />
              ) : (
                <Loader />
              )}
            </Messages>
            <Response>
              <InputComponent messages={messages} showOffer={showOffer} />
            </Response>
          </KeyboardAvoid>
          <Dialog />
        </>
      )}
    </Container>
  );
};

const mapStateToProps = (state: any) => {
  return {
    messages: state.chat.messages,
    showReturnToOfferButton: selectors.shouldShowReturnToOfferScreenButton(
      state,
    ),
    intent: state.conversation.intent,
    onboardingDone: selectors.isOnboardingDone(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getMessages: (intent: null | string) =>
      dispatch(
        chatActions.getMessages({
          intent,
        }),
      ),
    getAvatars: () => dispatch(chatActions.getAvatars()),
    editLastResponse: () => dispatch(chatActions.editLastResponse()),
  };
};

const ChatContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat);

export default ChatContainer;
