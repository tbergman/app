import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet, AppState } from 'react-native';
import { NavigationActions } from 'react-navigation';

import MessageList from './containers/MessageList';
import ChatNumberInput from './containers/ChatNumberInput';
import ChatTextInput from './containers/ChatTextInput';
import DateInput from './containers/DateInput';
import MultipleSelectInput from './containers/MultipleSelectInput';
import SingleSelectInput from './containers/SingleSelectInput';
import PhotoInput from './containers/PhotoInput';
import BankIdCollectInput from './containers/BankIdCollectInput';
import AudioInput from './containers/AudioInput';
import ParagraphInput from './containers/ParagraphInput';
import { NavBar } from '../../components/NavBar';
import { KeyboardAwareView } from './components/KeyboardAwareView';
import { Loader } from '../../components/Loader';
import { chatActions, dialogActions, types } from '../../../hedvig-redux';
import * as navigationActions from '../../actions/baseNavigation';
import {
  BackToOfferButton,
  CloseButton,
  RestartButton,
} from './components/Button';
import * as selectors from './state/selectors';

const inputComponentMap = {
  multiple_select: <MultipleSelectInput />,
  text: <ChatTextInput />,
  number: <ChatNumberInput />,
  single_select: <SingleSelectInput />,
  date_picker: <DateInput />,
  photo_upload: <PhotoInput />,
  bankid_collect: <BankIdCollectInput />,
  paragraph: <ParagraphInput />,
  audio: <AudioInput />,
};

class UnconnectedPollingMessage extends React.Component {
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
  (dispatch) => ({
    startPolling: () => dispatch({ type: types.START_POLLING_MESSAGES }),
    stopPolling: () => dispatch({ type: types.STOP_POLLING_MESSAGES }),
  }),
)(UnconnectedPollingMessage);

const getInputComponent = (messages) => {
  if (messages.length === 0) {
    return null;
  }
  let lastMessage = messages[0];
  let lastMessageType = lastMessage.body.type;
  if (lastMessageType === 'polling') {
    lastMessage = messages[1];
    lastMessageType = lastMessage.body.type;
    return (
      <PollingMessage>{inputComponentMap[lastMessageType]}</PollingMessage>
    );
  }
  return inputComponentMap[lastMessageType];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

class Chat extends React.Component {
  static propTypes = {
    showOffer: PropTypes.func.isRequired,
    getMessages: PropTypes.func.isRequired,
    getAvatars: PropTypes.func.isRequired,
    messages: PropTypes.arrayOf(PropTypes.object),
    onboardingDone: PropTypes.bool,
  };
  static defaultProps = { onboardingDone: false };
  componentDidMount() {
    this.props.getMessages(this.props.intent);
    this.props.getAvatars();
    AppState.addEventListener('change', this._handleAppStateChange);
    this._startPolling();
  }

  componentDidUpdate() {
    if (this.props.navigation.isFocused()) {
      this._startPolling();
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    this._stopPolling();
  }

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

  _handleAppStateChange = (appState) => {
    if (appState === 'active') {
      this.props.getMessages(this.props.intent);
    }
  };

  _showOffer = () => {
    this._stopPolling();
    this.props.showOffer();
  };

  _showDashboard = () => {
    this._stopPolling();
    this.props.showDashboard();
  };

  _resetConversation = () => {
    this.props.resetConversation();
  };

  render() {
    let headerLeft;
    let headerRight;
    if (this.props.onboardingDone) {
      headerLeft = <CloseButton onPress={this._showDashboard} />;
    } else {
      if (this.props.showReturnToOfferButton) {
        headerRight = <BackToOfferButton onPress={this._showOffer} />;
      } else {
        headerRight = <RestartButton onPress={this._resetConversation} />;
      }
    }

    return (
      <View style={styles.container}>
        <NavBar
          title="Hedvig"
          headerLeft={headerLeft}
          headerRight={headerRight}
        />
        <KeyboardAwareView>
          <View style={styles.messages}>
            {this.props.messages.length ? <MessageList /> : <Loader />}
          </View>
          <View style={styles.response}>
            {getInputComponent(this.props.messages, this.props.navigation)}
          </View>
        </KeyboardAwareView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
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

const mapDispatchToProps = (dispatch) => {
  return {
    getMessages: (intent) =>
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
    showDashboard: () => dispatch(navigationActions.showDashboardAction()),
    showOffer: () =>
      dispatch(NavigationActions.navigate({ routeName: 'Offer' })),
  };
};

const ChatContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat);

export default ChatContainer;
