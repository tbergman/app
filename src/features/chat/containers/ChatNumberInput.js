import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { chatActions } from '../../../../hedvig-redux';
import { StyledTextInputContainer } from '../styles/chat';
import * as selectors from '../state/selectors';
import { SendButton } from '../components/Button';

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    alignSelf: 'stretch',
    height: 40,
    paddingTop: 10,
    paddingRight: 16,
    paddingBottom: 10,
    paddingLeft: 16,
    marginRight: 8,
    backgroundColor: '#ffffff',
    borderColor: '#651eff',
    borderWidth: 1,
    borderRadius: 24,
    fontSize: 16,
    overflow: 'hidden',
  },
});

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

  componentDidUpdate(prevProps) {
    if (this.props.message.globalId !== prevProps.message.globalId) {
      this._onTextChange('');
      if (this.ref) {
        this.ref.focus();
      }
    }
  }

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
        <TextInput
          ref={(ref) => (this.ref = ref)}
          style={styles.textInput}
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
