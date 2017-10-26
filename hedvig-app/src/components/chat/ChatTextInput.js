import React from "react"
import { Text, TouchableOpacity, View, TextInput } from "react-native"
import { StyledTextInputContainer, StyledTextInput } from "../styles/chat"
import { TextInputSubmitButton, SendIconButton } from "../Button"

const ChatTextInput = ({ message, onChange, send }) => {
  let ButtonComponent = message._inputValue && message._inputValue.length > 0
    ? SendIconButton : TextInputSubmitButton
  return (
    <StyledTextInputContainer>
      <StyledTextInput
        placeholder="Type here..."
        autoFocus={true}
        value={message._inputValue || ""}
        onChangeText={text => onChange(message, text)}
      />
      <ButtonComponent onPress={() => send(message)} title="Skip" />
    </StyledTextInputContainer>
  )
}

export default ChatTextInput
