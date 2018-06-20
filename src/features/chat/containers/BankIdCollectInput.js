import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { types } from '../../../../hedvig-redux';
import { UploadingAnimation } from '../../../components/Animation';

class BankIdCollectInput extends React.Component {
  componentDidMount() {
    this.props.startCollecting(this.props.message.body.referenceId);
  }

  render() {
    return (
      <View
        style={{ height: 200, alignItems: 'center', justifyContent: 'center' }}
      >
        <UploadingAnimation />
      </View>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    message: state.chat.messages[ownProps.messageIndex],
  };
};

const mapDispatchToProps = (dispatch) => ({
  startCollecting: (referenceId) =>
    dispatch({
      type: types.DEPRECATED_BANKID_COLLECT,
      payload: { referenceId },
    }),
});

const BankIdCollectInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BankIdCollectInput);

export default BankIdCollectInputContainer;
