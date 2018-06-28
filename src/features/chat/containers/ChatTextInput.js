import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Permissions } from 'expo';

import { chatActions, dialogActions } from '../../../../hedvig-redux';
import { StyledTextInputContainer, StyledTextInput } from '../styles/chat';
import { isSendingChatMessage } from '../state/selectors';
import { SendButton } from '../components/Button';

class ChatTextInput extends React.Component {
  static propTypes = {
    message: PropTypes.object, // TODO Better definition for the shape of a message - should be reusable
    onChange: PropTypes.func.isRequired,
    isSending: PropTypes.bool,
  };

  static defaultProps = {
    isSending: false,
  };

  _send = async () => {
    if (this.props.message.header.shouldRequestPushNotifications) {
      const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      if (status !== 'granted') {
        if (!(__DEV__ && status === 'undetermined')) {
          this.props.requestPushNotifications();
        }
      }
    }
    if (!this.props.isSending) {
      this.props.send(this.props.message);
    }
  };

  render() {
    const { message, onChange, isSending } = this.props;
    return (
      <StyledTextInputContainer>
        <StyledTextInput
          autoFocus
          placeholder="Skriv här..."
          value={message._inputValue || ''}
          underlineColorAndroid="transparent"
          onChangeText={(text) => onChange(message, text)}
          multiline
          returnKeyType="send"
          enablesReturnKeyAutomatically
          blurOnSubmit
          onSubmitEditing={this._send}
          editable={!isSending}
        />
        <SendButton
          onPress={this._send}
          disabled={
            !(
              message._inputValue &&
              message._inputValue.length > 0 &&
              !isSending
            )
          }
        />
      </StyledTextInputContainer>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    message: state.chat.messages[0],
    isSending: isSendingChatMessage(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (message, value) =>
      dispatch(chatActions.setResponseValue(message, value)),
    send: (message) =>
      dispatch(
        chatActions.sendChatResponse(message, {
          text: message._inputValue,
        }),
      ),
    requestPushNotifications: () => {
      dispatch(
        dialogActions.showDialog({
          title: 'Notifikationer',
          paragraph:
            'Slå på push-notiser så att du inte missar när Hedvig svarar!',
          confirmButtonTitle: 'Slå på',
          dismissButtonTitle: 'Inte nu',
          onConfirm: () =>
            dispatch({
              type: 'PUSH_NOTIFICATIONS/REQUEST_PUSH',
            }),
          onDismiss: () => {},
        }),
      );
    },
  };
};

const ChatTextInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatTextInput);

export default ChatTextInputContainer;
