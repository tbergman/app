import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import { chatActions } from '../../../../hedvig-redux';
import {
  StyledRightAlignedOptions,
  StyledOptionsContainer,
  StyledMarginContainer,
} from '../styles/chat';
import {
  AnimatedMultipleSelectOptionButton,
  SendButton,
} from '../components/Button';
import * as selectors from '../state/selectors';

const WRAP_NUM_OPTIONS = 6;

class MultipleSelectInput extends React.Component {
  static propTypes = {
    message: PropTypes.object.isRequired,
    selections: PropTypes.arrayOf(PropTypes.string),
    onChoiceSelected: PropTypes.func.isRequired,
    done: PropTypes.func.isRequired,
  };

  static defaultProps = {
    selections: [],
  };

  _send = () => {
    this.props.done(this.props.message, this.props.selections);
  };

  _onChoiceSelected = (choice) => () => {
    this.props.onChoiceSelected(choice);
  };
  render() {
    const { message, selections } = this.props;
    let opts = message.body.choices.map((choice) => {
      return (
        <StyledRightAlignedOptions key={choice.text}>
          <AnimatedMultipleSelectOptionButton
            onPress={this._onChoiceSelected(choice)}
            title={choice.text}
            selected={
              selections &&
              selections.some((selection) => choice.value === selection)
            }
          />
        </StyledRightAlignedOptions>
      );
    });
    let wrap = message.body.choices.length > WRAP_NUM_OPTIONS;
    return (
      <StyledMarginContainer wrap={wrap}>
        <StyledOptionsContainer wrap={wrap}>{opts}</StyledOptionsContainer>
        <StyledRightAlignedOptions>
          <SendButton disabled={selections.length < 1} onPress={this._send} />
        </StyledRightAlignedOptions>
      </StyledMarginContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  message: state.chat.messages[0],
  selections: selectors.getMultiSelectChoices(state),
});

const mapDispatchToProps = (dispatch) => {
  return {
    onChoiceSelected: (choice) =>
      dispatch({
        type: 'CHAT/SELECT_MULTIPLE_SELECTION_OPTION',
        payload: { choice: choice.value },
      }),
    done: (message, selections) => {
      let body = cloneDeep(message.body);
      selections.forEach((selection) => {
        const idx = message.body.choices.findIndex(
          (i) => i.value === selection,
        );
        body.choices[idx].selected = true;
      });
      dispatch(chatActions.sendChatResponse(message, body));
    },
  };
};

const MultipleSelectInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MultipleSelectInput);

export default MultipleSelectInputContainer;
