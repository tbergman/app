import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const statusBarHeight = getStatusBarHeight();

export class KeyboardAwareView extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={statusBarHeight}
      >
        {this.props.children}
      </KeyboardAvoidingView>
    );
  }
}
