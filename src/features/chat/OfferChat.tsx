import * as React from 'react';
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import { View, StyleSheet, AppState, KeyboardAvoidingView } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';

import MessageList from './containers/MessageList';
import InputComponent from './components/InputComponent';
import { Loader } from '../../components/Loader';
import { chatActions, dialogActions, types } from '../../../hedvig-redux';
import * as selectors from './state/selectors';

import Dialog from 'src/containers/Dialog';

interface UnconnectedPollingMessageProps {
  startPolling: () => void;
  stopPolling: () => void;
}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...ifIphoneX(
      {
        marginBottom: 20,
      },
      {
        marginBottom: 0,
      },
    ),
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
  static defaultProps = { onboardingDone: false };
  _longPollTimeout: any = null;

  constructor(props: ChatProps) {
    super(props);
  }

  componentDidMount() {
    this.props.getMessages(this.props.intent!);
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

  _startPolling = () => {
    if (!this._longPollTimeout) {
      this._longPollTimeout = setInterval(() => {
        this.props.getMessages(null);
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
      this.props.getMessages(null);
    }
  };

  _showOffer = () => {
    this._stopPolling();
    this.props.onRequestClose!();
  };

  _showDashboard = () => {
    this._stopPolling();
    this.props.showDashboard!();
  };

  _resetConversation = () => {
    this.props.resetConversation!();
  };

  render() {
    return (
      <>
        <KeyboardAvoidingView
          keyboardVerticalOffset={ifIphoneX ? 90 : 70}
          behavior="padding"
          enabled={Platform.OS === 'ios'}
          style={styles.container}
        >
          <View style={styles.messages}>
            {this.props.messages!.length ? (
              <MessageList showOffer={this._showOffer} />
            ) : (
              <Loader />
            )}
          </View>
          <View style={styles.response}>
            <InputComponent
              messages={this.props.messages}
              showOffer={this._showOffer}
            />
          </View>
        </KeyboardAvoidingView>
        <Dialog />
      </>
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
