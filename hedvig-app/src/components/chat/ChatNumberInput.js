import React from "react"
import { Text, TouchableOpacity, View, TextInput } from "react-native"
import styled from "styled-components/native"

const StyledView = styled.View`border: solid 1px black;`

const ChatTextInput = ({ message, onChange, send }) => {
  return (
    <StyledView>
      <TextInput
        placeholder="Type here..."
        autoFocus={true}
        keyboardType="numeric"
        value={message._inputValue || ""}
        onChangeText={text => onChange(message, text)}
      />
      <TouchableOpacity onPress={() => send(message)}>
        <Text>Send</Text>
      </TouchableOpacity>
    </StyledView>
  )
}

export default ChatTextInput
