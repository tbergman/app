import React from "react"
import PropTypes from "prop-types"
import { KeyboardAvoidingView, StyleSheet, Platform } from "react-native"
import { Constants } from "expo"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  }
})

export class KeyboardAwareView extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={Constants.statusBarHeight}>
        {this.props.children}
      </KeyboardAvoidingView>
    )
  }
}
