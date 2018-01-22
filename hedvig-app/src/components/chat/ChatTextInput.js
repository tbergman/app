import React from "react"
import { StyledTextInputContainer, StyledTextInput } from "../styles/chat"
import { SendIconButton, SendDisabledIconButton } from "../Button"

class ChatTextInput extends React.Component {
  lastSentFor = undefined

  _send = () => {
    if (!this.lastSentFor || this.lastSentFor !== this.props.message.globalId) {
      this.lastSentFor = this.props.message.globalId
      this.props.send(this.props.message)
    }
  }

  render() {
    const { message, onChange } = this.props;
    let ButtonComponent =
      message._inputValue && message._inputValue.length > 0
        ? SendIconButton
        : SendDisabledIconButton
    return (
      <StyledTextInputContainer>
        <StyledTextInput
          placeholder="Skriv här..."
          autoFocus={true}
          value={message._inputValue || ""}
          underlineColorAndroid="transparent"
          onChangeText={text => onChange(message, text)}
          multiline={true}
          autoGrow={true}
          onSubmitEditing={this._send}
        />
        <ButtonComponent onPress={this._send} />
      </StyledTextInputContainer>
    )
  }
}

export default ChatTextInput
