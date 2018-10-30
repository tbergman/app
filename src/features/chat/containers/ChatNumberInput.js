import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import styled from '@sampettersson/primitives';

import { chatActions } from '../../../../hedvig-redux';
import * as selectors from '../state/selectors';
import { SendButton } from '../components/Button';

import { colors, fonts } from '@hedviginsurance/brand';

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
    fontSize: 16,
    overflow: 'hidden',
    fontFamily: fonts.CIRCULAR,
  },
});

const Bar = styled(View)({
  flexDirection: 'row',
  alignItems: 'flex-end',
  marginRight: 8,
  marginLeft: 8,
  marginBottom: 8,
});

const TextInputContainer = styled(View)({
  flexDirection: 'row',
  flex: 1,
  backgroundColor: colors.WHITE,
  borderColor: colors.PURPLE,
  borderWidth: 1,
  borderRadius: 24,
  alignItems: 'flex-end',
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
      <Bar>
        <TextInputContainer>
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
            size="small"
          />
        </TextInputContainer>
      </Bar>
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
