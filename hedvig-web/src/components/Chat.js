import React from "react"

import MessageList from "../containers/chat/MessageList"
import ChatNumberInput from "../containers/chat/ChatNumberInput"
import ChatTextInput from "../containers/chat/ChatTextInput"
import DateInput from "../containers/chat/DateInput"
import MultipleSelectInput from "../containers/chat/MultipleSelectInput"
import SingleSelectInput from "../containers/chat/SingleSelectInput"
import BankIdCollectInput from "../containers/chat/BankIdCollectInput"
import ParagraphInput from "../containers/chat/ParagraphInput"
import FileInput from "../containers/chat/FileInput"
import { Header } from "../components/Header"

import {
  ChatAreaStyled,
  MessageAreaStyled,
  InputAreaStyled
} from "./styles/chat"
import { ResetIconButton } from "./Button"
import { FullHeight } from "./styles/general"

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
    date_picker: <DateInput messageIndex={lastIndex} />,
    bankid_collect: <BankIdCollectInput messageIndex={lastIndex} />,
    paragraph: <ParagraphInput messageIndex={lastIndex} />,
    file: <FileInput messageIndex={lastIndex} />
  }[lastMessageType]
}

export default class Chat extends React.Component {
  componentDidMount() {
    this.props.getMessages()
  }

  render() {
    return (
      <FullHeight>
        <Header
          headerRight={
            <ResetIconButton onClick={() => this.props.resetConversation()} />
          }
        />
        <ChatAreaStyled>
          <div style={{overflow: "hidden", height: "100%", minHeight: 0}}>
            <MessageAreaStyled style={{width: "100%", height: "100%"}}>
              <MessageList />
            </MessageAreaStyled>
          </div>

          <InputAreaStyled>
            {getInputComponent(this.props.messages)}
          </InputAreaStyled>
        </ChatAreaStyled>
      </FullHeight>
    )
  }
}
