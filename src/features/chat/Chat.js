import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, AppState } from 'react-native';

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
import {
  ChatNavRestartButton,
  NavigateBackButton,
} from '../../components/Button';
import { KeyboardAwareView } from './components/KeyboardAwareView';
import { Loader } from '../../components/Loader';
import { chatActions, dialogActions, types } from '../../../hedvig-redux';
import { showDashboardAction } from '../../actions/baseNavigation';

const inputComponentMap = (lastIndex, navigation) => ({
  multiple_select: <MultipleSelectInput messageIndex={lastIndex} />,
  text: <ChatTextInput messageIndex={lastIndex} />,
  number: <ChatNumberInput messageIndex={lastIndex} />,
  single_select: (
    <SingleSelectInput
      messageIndex={lastIndex}
      launchModal={() => navigation.navigate('Offer')}
    />
  ),
  date_picker: <DateInput messageIndex={lastIndex} />,
  photo_upload: <PhotoInput messageIndex={lastIndex} />,
  bankid_collect: <BankIdCollectInput messageIndex={lastIndex} />,
  paragraph: <ParagraphInput messageIndex={lastIndex} />,
  audio: <AudioInput messageIndex={lastIndex} />,
});

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

const getInputComponent = function(messages, navigation) {
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
        {inputComponentMap(0, navigation)[lastMessageType]}
      </PollingMessage>
    );
  }
  return inputComponentMap(0, navigation)[lastMessageType];
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
  componentDidMount() {
    this.props.getMessages(this.props.intent);
    this.props.getAvatars();
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (appState) => {
    if (appState === 'active') {
      this.props.getMessages(this.props.intent);
    }
  };

  render() {
    let headerLeft;
    let headerRight;
    if (
      this.props.insurance.status === 'INACTIVE' ||
      this.props.insurance.status === 'ACTIVE'
    ) {
      headerLeft = (
        <NavigateBackButton onPress={() => this.props.showDashboard()} />
      );
    } else {
      headerRight = (
        <ChatNavRestartButton onPress={() => this.props.resetConversation()} />
      );
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
    insurance: state.insurance,
    intent: state.conversation.intent,
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
    showDashboard: () => dispatch(showDashboardAction()),
  };
};

const ChatContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat);

export default ChatContainer;
