import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { chatActions } from '../../../../hedvig-redux';
import { StyledTextInputContainer, StyledTextInput } from '../styles/chat';
import * as selectors from '../state/selectors';
import { SendButton } from '../components/Button';

class ChatNumberInput extends React.Component {
  static propTypes = {
    message: PropTypes.object, // TODO Better definition of message type
    onChange: PropTypes.func.isRequired,
    send: PropTypes.func.isRequired,
    inputValue: PropTypes.string, // Inputs are entered as strings despite always being numbers
    isSending: PropTypes.bool,
  };

  static defaultProps = {
    isSending: false,
    inputValue: undefined,
  };

  _send = () => {
    this.props.send(this.props.message, this.props.inputValue);
  };

  _onTextChange = (text) => {
    this.props.onChange(text);
  };

  render() {
    const { isSending, inputValue } = this.props;
    return (
      <StyledTextInputContainer>
        <StyledTextInput
          placeholder="Skriv här..."
          autoFocus
          keyboardType="numeric"
          value={inputValue || ''}
          underlineColorAndroid="transparent"
          onChangeText={this._onTextChange}
          onSubmitEditing={this._send}
        />
        <SendButton
          onPress={this._send}
          disabled={!(inputValue && inputValue.length > 0 && !isSending)}
        />
      </StyledTextInputContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.chat.messages[0],
    isSending: selectors.isSendingChatMessage(state),
    inputValue: selectors.getInputValue(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (value) =>
      dispatch({ type: 'CHAT/SET_INPUT_VALUE', payload: value }),
    send: (message, text) =>
      dispatch(
        chatActions.sendChatResponse(message, {
          text,
        }),
      ),
  };
};

const ChatNumberInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatNumberInput);

export default ChatNumberInputContainer;
