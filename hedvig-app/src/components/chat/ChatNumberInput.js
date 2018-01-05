import React from "react"
import { StyledTextInputContainer, StyledTextInput } from "../styles/chat"
import { SendIconButton, SendDisabledIconButton } from "../Button"

const ChatTextInput = ({ message, onChange, send }) => {
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
        onSubmitEditing={() => send(message)}
      />
      <ButtonComponent onPress={() => send(message)} />
    </StyledTextInputContainer>
  )
}

export default ChatTextInput
