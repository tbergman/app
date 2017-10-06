import React from "react"
import { Text } from "react-native"
import styled from "styled-components/native"

import MessageList from "../containers/chat/MessageList"
import ChatNumberInput from "../containers/chat/ChatNumberInput"
import ChatTextInput from "../containers/chat/ChatTextInput"
import DateInput from "../containers/chat/DateInput"
import MultipleSelectInput from "../containers/chat/MultipleSelectInput"
import SingleSelectInput from "../containers/chat/SingleSelectInput"

const getInputComponent = function(messages) {
  if (messages.length === 0) {
    return null
  }
  let lastIndex = messages.length - 1
  let lastMessage = messages[lastIndex]
  let lastMessageType = lastMessage.body.type
  return {
    multiple_select: <MultipleSelectInput messageIndex={lastIndex} />,
    text: <ChatTextInput messageIndex={lastIndex} />,
    number: <ChatNumberInput messageIndex={lastIndex} />,
    single_select: <SingleSelectInput messageIndex={lastIndex} />,
    datepicker: <DateInput messageIndex={lastIndex} />
  }[lastMessageType]
}

const Container = styled.View`
  flex: 1;
  align-self: stretch;
`

const Half = styled.View`
  flex: 1;
  align-self: stretch;
  border: solid 1px black;
`

export default class Chat extends React.Component {
  render() {
    return (
      <Container>
        <Half>
          <MessageList />
        </Half>
        <Half>
          {getInputComponent(this.props.messages)}
        </Half>
      </Container>
    )
  }
}
