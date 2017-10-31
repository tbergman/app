import React from "react"
import { Text, TouchableOpacity, KeyboardAvoidingView } from "react-native"
import styled from "styled-components/native"

import MessageList from "../containers/chat/MessageList"
import LoadingIndicator from "../containers/chat/LoadingIndicator"
import ChatNumberInput from "../containers/chat/ChatNumberInput"
import ChatTextInput from "../containers/chat/ChatTextInput"
import DateInput from "../containers/chat/DateInput"
import MultipleSelectInput from "../containers/chat/MultipleSelectInput"
import SingleSelectInput from "../containers/chat/SingleSelectInput"
import VideoInput from "../containers/chat/VideoInput"
import PhotoInput from "../containers/chat/PhotoInput"
import BankIdCollectInput from "../containers/chat/BankIdCollectInput"
import AudioInput from "../containers/chat/AudioInput"
import {
  StyledChatContainer,
  StyledMessageAndResponseArea,
  StyledMessageArea,
  StyledResponseArea
} from "./styles/chat"
import ParagraphInput from "../containers/chat/ParagraphInput"
import { NavBar } from "./NavBar"
import { ChatNavRestartButton, ChatNavDashboardButton } from "./Button"

const getInputComponent = function(messages, navigation) {
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
    single_select: (
      <SingleSelectInput
        messageIndex={lastIndex}
        launchModal={choice =>
          navigation.navigate("ChatModal", { link: choice })}
      />
    ),
    date_picker: <DateInput messageIndex={lastIndex} />,
    video: (
      <VideoInput
        messageIndex={lastIndex}
        launchVideoRecorder={() => {
          navigation.navigate("ChatModal", { link: { view: "VideoExample" } })
        }}
      />
    ),
    photo_upload: <PhotoInput messageIndex={lastIndex} />,
    bankid_collect: <BankIdCollectInput messageIndex={lastIndex} />,
    paragraph: <ParagraphInput messageIndex={lastIndex} />,
    audio: <AudioInput messageIndex={lastIndex} />
  }[lastMessageType]
}

export default class Chat extends React.Component {
  componentDidMount() {
    this.props.registerForPushNotifications()
  }

  render() {
    let lastIndex = this.props.messages.length - 1
    let headerRight
    if (
      this.props.insurance.status === "PENDING" ||
      this.props.insurance.status === "ACTIVE"
    ) {
      headerRight = (
        <ChatNavDashboardButton onPress={() => this.props.showDashboard()} />
      )
    }
    return (
      <StyledChatContainer>
        <NavBar
          title="Chat"
          headerLeft={
            <ChatNavRestartButton
              onPress={() => this.props.resetConversation()}
            />
          }
          headerRight={headerRight}
        />
        <StyledMessageAndResponseArea behavior="padding">
          <StyledMessageArea>
            <MessageList />
            <LoadingIndicator messageIndex={lastIndex} />
          </StyledMessageArea>
          <StyledResponseArea>
            {getInputComponent(this.props.messages, this.props.navigation)}
          </StyledResponseArea>
        </StyledMessageAndResponseArea>
      </StyledChatContainer>
    )
  }
}
