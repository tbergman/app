import React from "react"
import { KeyboardAvoidingView } from "react-native"

export default class HedvigKeyboardAvoidingView extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={[
          this.props.style,
        ]}
        keyboardVerticalOffset={32}
      >
        {this.props.children}
      </KeyboardAvoidingView>
    )
  }
}
