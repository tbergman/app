import * as React from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { View, StyleSheet, AppState, KeyboardAvoidingView } from 'react-native';
import { ifIphoneX, isIphoneX } from 'react-native-iphone-x-helper';

import MessageList from './containers/MessageList';
import ChatNumberInput from './containers/ChatNumberInput';
import ChatTextInput from './containers/ChatTextInput';
import MultipleSelectInput from './containers/MultipleSelectInput';
import SingleSelectInput from './containers/SingleSelectInput';
import BankIdCollectInput from './containers/BankIdCollectInput';
import AudioInput from './containers/AudioInput';
import ParagraphInput from './containers/ParagraphInput';
import { Loader } from '../../components/Loader';
import { chatActions, dialogActions, types } from '../../../hedvig-redux';
import * as selectors from './state/selectors';
import { NavigationOptions } from '../../navigation/options';
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
import { any } from 'async';

interface ChatProps {
  onboardingDone: boolean;
  isModal: boolean;
  showReturnToOfferButton: boolean;
  componentId: string;
  intent: string;
  messages: Array<Object>;
  getAvatars: () => void;
  getMessages: (intent: string) => void;
  showDashboard: () => void;
  resetConversation: () => void;
}

interface UnconnectedPollingMessageProps {
  startPolling: () => void;
  stopPolling: () => void;
}

const inputComponentMap = {
  multiple_select: () => <MultipleSelectInput />,
  text: () => <ChatTextInput />,
  number: () => <ChatNumberInput />,
  single_select: (props: any) => <SingleSelectInput {...props} />,
  bankid_collect: () => <BankIdCollectInput />,
  paragraph: () => <ParagraphInput />,
  audio: () => <AudioInput />,
};

class UnconnectedPollingMessage extends React.Component<
  UnconnectedPollingMessageProps
> {
  componentDidMount() {
    this.props.startPolling();
  }

  componentWillUnmount() {
    this.props.stopPolling();
  }

  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

const PollingMessage = connect(
  undefined,
  (dispatch: any) => ({
    startPolling: () => dispatch({ type: types.START_POLLING_MESSAGES }),
    stopPolling: () => dispatch({ type: types.STOP_POLLING_MESSAGES }),
  }),
)(UnconnectedPollingMessage);

const getInputComponent = (messages: Array<any>, props: any) => {
  if (messages.length === 0) {
    return null;
  }
  let lastMessage = messages[0];
  let lastMessageType = lastMessage.body.type;
  if (lastMessageType === 'polling') {
    lastMessage = messages[1];
    lastMessageType = lastMessage.body.type;
    return (
      <PollingMessage>
        {inputComponentMap[lastMessageType](props)}
      </PollingMessage>
    );
  }
  return inputComponentMap[lastMessageType](props);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...ifIphoneX({
      marginBottom: 20,
    }),
  },
  messages: {
    flex: 1,
    alignSelf: 'stretch',
    paddingLeft: 16,
    paddingRight: 16,
  },
  response: {
    alignItems: 'stretch',
    paddingTop: 8,
  },
});

class Chat extends React.Component<ChatProps> {
  /*static propTypes = {
    getMessages: PropTypes.func.isRequired,
    getAvatars: PropTypes.func.isRequired,
    messages: PropTypes.arrayOf(PropTypes.object),
    onboardingDone: PropTypes.bool,
  };*/
  static defaultProps = { onboardingDone: false };

  constructor(props: ChatProps) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed(buttonId: Object) {
    if (buttonId === RESTART_BUTTON.id) {
      this._resetConversation();
    }

    if (buttonId === CLOSE_BUTTON.id) {
      Navigation.dismissModal(this.props.componentId);
    }

    if (buttonId === GO_TO_DASHBOARD_BUTTON.id) {
      setLayout(getMainLayout());
    }

    if (buttonId === SHOW_OFFER_BUTTON.id) {
      this._showOffer();
    }
  }

  componentDidMount() {
    this.props.getMessages(this.props.intent);
    this.props.getAvatars();
    AppState.addEventListener('change', this._handleAppStateChange);
    this._startPolling();
  }

  componentDidUpdate() {
    this._startPolling();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    this._stopPolling();
  }

  getNavigationOptions = () => {
    const { onboardingDone, isModal, showReturnToOfferButton } = this.props;

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

  _startPolling = () => {
    if (!this._longPollTimeout) {
      this._longPollTimeout = setInterval(() => {
        this.props.getMessages(this.props.intent);
      }, 15000);
    }
  };

  _stopPolling = () => {
    if (this._longPollTimeout) {
      clearInterval(this._longPollTimeout);
      this._longPollTimeout = null;
    }
  };

  _handleAppStateChange = (appState: string) => {
    if (appState === 'active') {
      this.props.getMessages(this.props.intent);
    }
  };

  _showOffer = async () => {
    this._stopPolling();
    const { screen, group } = await getOfferScreen();

    if (group === OFFER_GROUPS.OLD) {
      Navigation.showModal({
        stack: {
          children: [screen],
        },
      });
    } else {
      Navigation.push(this.props.componentId, screen);
    }
  };

  _showDashboard = () => {
    this._stopPolling();
    this.props.showDashboard();
  };

  _resetConversation = () => {
    this.props.resetConversation();
  };

  render() {
    return (
      <NavigationOptions options={this.getNavigationOptions()}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={isIphoneX() ? 100 : 60}
          behavior="padding"
          enabled={Platform.OS === 'ios'}
          style={styles.container}
        >
          <View style={styles.messages}>
            {this.props.messages.length ? <MessageList /> : <Loader />}
          </View>
          <View style={styles.response}>
            {getInputComponent(this.props.messages, {
              showOffer: this._showOffer,
            })}
          </View>
        </KeyboardAvoidingView>
      </NavigationOptions>
    );
  }
}

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
    getMessages: (intent: string) =>
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
