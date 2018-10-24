import * as React from 'react';
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import { View, AppState, KeyboardAvoidingView } from 'react-native';
import styled from '@sampettersson/primitives';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { Mount, Update, Unmount } from 'react-lifecycle-components';

import MessageList from './containers/MessageList';
import InputComponent from './components/InputComponent';
import { Loader } from '../../components/Loader';
import { chatActions } from '../../../hedvig-redux';
import * as selectors from './state/selectors';

import Dialog from 'src/containers/Dialog';

interface ChatProps {
  onboardingDone?: boolean;
  intent?: null | string;
  messages?: Array<object>;
  getAvatars: () => void;
  getMessages: (intent: null | string) => void;
  showDashboard?: () => void;
  resetConversation?: () => void;
  onRequestClose?: () => void;
}

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

const Chat: React.SFC<ChatProps> = (props) => {
  let longPollTimeout: any = null;

  const mount = () => {
    props.getMessages(props.intent!);
    props.getAvatars();
    AppState.addEventListener('change', handleAppStateChange);
    startPolling();
  };

  const update = () => {
    startPolling();
  };

  const unmount = () => {
    AppState.removeEventListener('change', handleAppStateChange);
    stopPolling();
  };

  const startPolling = () => {
    if (!longPollTimeout) {
      longPollTimeout = setInterval(() => {
        props.getMessages(null);
      }, 15000);
    }
  };

  const stopPolling = () => {
    if (longPollTimeout) {
      clearInterval(longPollTimeout);
      longPollTimeout = null;
    }
  };

  const handleAppStateChange = (appState: string) => {
    if (appState === 'active') {
      props.getMessages(null);
    }
  };

  const showOffer = () => {
    stopPolling();
    props.onRequestClose!();
  };

  return (
    <>
      <Mount
        on={() => {
          mount();
        }}
      />
      <Unmount
        on={() => {
          unmount();
        }}
      />
      <Update
        was={() => {
          update();
        }}
        watched={props}
      />
      <KeyboardAvoid
        keyboardVerticalOffset={ifIphoneX ? 90 : 70}
        behavior="padding"
        enabled={Platform.OS === 'ios'}
      >
        <Messages>
          {props.messages!.length ? (
            <MessageList showOffer={showOffer} />
          ) : (
            <Loader />
          )}
        </Messages>
        <Response>
          <InputComponent messages={props.messages} showOffer={showOffer} />
        </Response>
      </KeyboardAvoid>
      <Dialog />
    </>
  );
};

Chat.defaultProps = { onboardingDone: false };

const mapStateToProps = (state: any) => {
  return {
    messages: state.chat.messages,
    showReturnToOfferButton: selectors.shouldShowReturnToOfferScreenButton(
      state,
    ),
    insurance: state.insurance,
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
