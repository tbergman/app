import React from "react"
import { StyledTextInputContainer, StyledTextInput } from "../styles/chat"
import { SendIconButton, SendDisabledIconButton } from "../Button"

class ChatTextInput extends React.Component {
  buttonPressed = false

  _send = () => {
    if (!this.buttonPressed) {
      this.buttonPressed = true
      this.props.send(this.props.message)
    }
  }

  render() {
    const { message, onChange } = this.props
    let ButtonComponent =
      message._inputValue && message._inputValue.length > 0
        ? SendIconButton
        : SendDisabledIconButton
    return (
      <StyledTextInputContainer>
        <StyledTextInput
          placeholder="Type here..."
          autoFocus={true}
          keyboardType="numeric"
          value={message._inputValue || ""}
          underlineColorAndroid="transparent"
          onChangeText={text => onChange(message, text)}
          onSubmitEditing={this._send}
        />
        <ButtonComponent onPress={this._send} />
      </StyledTextInputContainer>
    )
  }
}

export default ChatTextInput
