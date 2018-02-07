import React from "react"
import PropTypes from "prop-types"
import { KeyboardAvoidingView, ViewPropTypes } from "react-native"

export default class HedvigKeyboardAvoidingView extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    style: ViewPropTypes.style
  }

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
