import * as React from 'react';
import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { View, AppState, KeyboardAvoidingView } from 'react-native';
import styled from '@sampettersson/primitives';
import { ifIphoneX, isIphoneX } from 'react-native-iphone-x-helper';
import { Mount, Update, Unmount } from 'react-lifecycle-components';
import { Container, EffectMap } from 'constate';

import MessageList from './containers/MessageList';
import InputComponent from './components/InputComponent';
import { Loader } from '../../components/Loader';
import { chatActions, dialogActions } from '../../../hedvig-redux';
import * as selectors from './state/selectors';
import { NavigationOptions } from '../../navigation/options';
import { NavigationEvents } from 'src/navigation/events';
import { getMainLayout, setLayout } from '../../navigation/layout';
import {
  getOfferScreen,
  OFFER_GROUPS,
} from 'src/navigation/screens/offer/ab-test';
import {
  RESTART_BUTTON,
  CLOSE_BUTTON,
  GO_TO_DASHBOARD_BUTTON,
  SHOW_OFFER_BUTTON,
} from '../../navigation/screens/chat/buttons';

interface ChatProps {
  onboardingDone?: boolean;
  isModal?: boolean;
  showReturnToOfferButton?: boolean;
  componentId?: string;
  intent?: string;
  messages?: Array<object>;
  insurance?: any;
  getAvatars: () => void;
  getMessages: (intent: null | string) => void;
  showDashboard?: () => void;
  resetConversation?: () => void;
}

interface State {
  longPollTimeout: any;
}

const initialState: State = {
  longPollTimeout: null,
};

interface Effects {
  startPolling: (props: any) => void;
  stopPolling: () => void;
}

const effects: EffectMap<State, Effects> = {
  startPolling: (props) => ({ setState, state }: any) => {
    if (!state.longPollTimeout) {
      setState((state: any) => ({
        longPollTimeout: setInterval(() => {
          props.getMessages(props.intent!);
        }, 15000),
      }));
    }
  },
  stopPolling: () => ({ setState, state }: any) => {
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

const getNavigationOptions = (props: any) => {
  const { onboardingDone, isModal, showReturnToOfferButton } = props;

  if (onboardingDone) {
    if (isModal) {
      return {
        topBar: {
          leftButtons: [CLOSE_BUTTON],
          rightButtons: [],
        },
      };
    }

    return {
      topBar: {
        leftButtons: [GO_TO_DASHBOARD_BUTTON],
        rightButtons: [],
      },
    };
  } else {
    if (showReturnToOfferButton) {
      {
        return {
          topBar: {
            leftButtons: [],
            rightButtons: [SHOW_OFFER_BUTTON],
          },
        };
      }
    }

    return {
      topBar: {
        leftButtons: [],
        rightButtons: [RESTART_BUTTON],
      },
    };
  }
};

const showOffer = async (stopPolling: any, props: any) => {
  stopPolling();
  const { screen, group } = await getOfferScreen();

  if (group === OFFER_GROUPS.OLD) {
    Navigation.showModal({
      stack: {
        children: [screen],
      },
    });
  } else {
    Navigation.push(props.componentId!, screen);
  }
};

const handleAppStateChange = (appState: string, props: any) => {
  if (appState === 'active') {
    props.getMessages(props.intent!);
  }
};

const Chat: React.SFC<ChatProps> = (props) => (
  <Container effects={effects} initialState={initialState}>
    {({ startPolling, stopPolling }) => (
      <>
        <NavigationEvents
          onNavigationButtonPressed={(event: any) => {
            if (event.buttonId === RESTART_BUTTON.id) {
              props.resetConversation!();
            }

            if (event.buttonId === CLOSE_BUTTON.id) {
              Navigation.dismissModal(props.componentId!);
            }

            if (event.buttonId === GO_TO_DASHBOARD_BUTTON.id) {
              setLayout(getMainLayout());
            }

            if (event.buttonId === SHOW_OFFER_BUTTON.id) {
              showOffer(stopPolling, props);
            }
          }}
        />
        <Mount
          on={() => {
            props.getMessages(props.intent!);
            props.getAvatars();
            AppState.addEventListener('change', (appState) => {
              handleAppStateChange(appState, props);
            });
            startPolling(props);
          }}
        >
          {null}
        </Mount>
        <Update
          was={() => {
            startPolling(props);
          }}
          watched={props}
        >
          {null}
        </Update>
        <Unmount
          on={() => {
            AppState.addEventListener('change', (appState) => {
              handleAppStateChange(appState, props);
            });
            stopPolling();
          }}
        >
          {null}
        </Unmount>

        <NavigationOptions options={getNavigationOptions(props)}>
          <KeyboardAvoid
            keyboardVerticalOffset={isIphoneX() ? 85 : 60}
            behavior="padding"
            enabled={Platform.OS === 'ios'}
          >
            <Messages>
              {props.messages!.length ? <MessageList /> : <Loader />}
            </Messages>
            <Response>
              <InputComponent showOffer={showOffer} messages={props.messages} />
            </Response>
          </KeyboardAvoid>
        </NavigationOptions>
      </>
    )}
  </Container>
);

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
    resetConversation: () =>
      dispatch(
        dialogActions.showDialog({
          title: 'Vill du börja om?',
          paragraph:
            'Om du trycker ja så börjar\nkonversationen om från början',
          confirmButtonTitle: 'Ja',
          dismissButtonTitle: 'Nej',
          onConfirm: () => dispatch(chatActions.resetConversation()),
          onDismiss: () => {},
        }),
      ),
    editLastResponse: () => dispatch(chatActions.editLastResponse()),
  };
};

const ChatContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat);

export default ChatContainer;
