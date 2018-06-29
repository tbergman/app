import React from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { chatActions } from '../../../../hedvig-redux';
import {
  StyledRightAlignedOptions,
  StyledOptionsContainer,
  StyledMarginContainer,
} from '../styles/chat';
import {
  SendIconButton,
  SendDisabledIconButton,
} from '../../../components/Button';
import { AnimatedMultipleSelectOptionButton } from '../components/Button';

const WRAP_NUM_OPTIONS = 6;

class MultipleSelectInput extends React.Component {
  render() {
    const { message, onChoiceSelected, done } = this.props;
    let anyOptionSelected = R.any(
      (choice) => choice.selected,
      message.body.choices,
    );
    let sendButton = anyOptionSelected ? (
      <SendIconButton
        onPress={() => {
          done(message);
        }}
      />
    ) : (
      <SendDisabledIconButton />
    );
    let opts = message.body.choices.map((choice) => {
      return (
        <StyledRightAlignedOptions key={choice.text}>
          <AnimatedMultipleSelectOptionButton
            onPress={() => {
              onChoiceSelected(message, choice);
            }}
            title={choice.text}
            selected={choice.selected}
          />
        </StyledRightAlignedOptions>
      );
    });
    let wrap = message.body.choices.length > WRAP_NUM_OPTIONS;
    return (
      <StyledMarginContainer wrap={wrap}>
        <StyledOptionsContainer wrap={wrap}>{opts}</StyledOptionsContainer>
        <StyledRightAlignedOptions>{sendButton}</StyledRightAlignedOptions>
      </StyledMarginContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.chat.messages[0],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChoiceSelected: (message, choice) =>
      dispatch(chatActions.selectChoice(message, choice)),
    done: (message) => dispatch(chatActions.sendChatResponse(message)),
  };
};

const MultipleSelectInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MultipleSelectInput);

export default MultipleSelectInputContainer;
