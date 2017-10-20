import React from "react"
import styled from "styled-components"

import MessageList from "../containers/chat/MessageList"
// import ChatNumberInput from "../containers/chat/ChatNumberInput"
// import ChatTextInput from "../containers/chat/ChatTextInput"
// import DateInput from "../containers/chat/DateInput"
// import MultipleSelectInput from "../containers/chat/MultipleSelectInput"
// import SingleSelectInput from "../containers/chat/SingleSelectInput"
// import VideoInput from "../containers/chat/VideoInput"
// import PhotoInput from "../containers/chat/PhotoInput"

/*
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
    photo_upload: <PhotoInput messageIndex={lastIndex} />
  }[lastMessageType]
}
*/

export default class Chat extends React.Component {
  render() {
    return <MessageList />
  }
}
