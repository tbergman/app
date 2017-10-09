import React from "react"
import { Text, View } from "react-native"
import { BaseScrolleViewStyle, ChatMessageStyle } from "../Styles"

const renderMessage = function(message, idx) {
  let fromMe = message.header.fromMe !== 1
  let flexDirection = fromMe ? "row-reverse" : "row"
  let alignSelf = fromMe ? "flex-end" : "flex-start"
  let textAlign = fromMe ? "right" : "left"
  return (
    <View key={idx}>
      <ChatMessageStyle
        style={{
          flexDirection: flexDirection,
          alignSelf: alignSelf
        }}
      >
        <Text style={{ textAlign: textAlign }}>
          {message.body.text}
        </Text>
      </ChatMessageStyle>
    </View>
  )
}

const renderMessages = function(messages) {
  return messages.map(renderMessage)
}

const MessageList = ({ messages }) => {
  return (
    <BaseScrolleViewStyle
      innerRef={x => (this.ref = x)}
      onContentSizeChange={() => this.ref.scrollToEnd()}
    >
      {renderMessages(messages)}
    </BaseScrolleViewStyle>
  )
}

export default MessageList
