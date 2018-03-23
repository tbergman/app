import React from 'react';
import { View } from 'react-native';
import { UploadingAnimation } from '../Animation';

export default class BankIdCollectInput extends React.Component {
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
