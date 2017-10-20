import React from "react"
import { Text, View, Image } from "react-native"
import { BaseScrollViewStyle } from "../Styles"
import { StyledDefaultMessage, StyledChatMessage } from "../styles/chat"

const renderImage = message => {
  if (
    message.body.imageURL &&
    message.body.imageHeight &&
    message.body.imageWidth
  ) {
    return (
      <Image
        source={{ uri: message.body.imageURL }}
        style={{
          height: message.body.imageHeight,
          width: message.body.imageWidth
        }}
      />
    )
  } else {
    return null
  }
}

const SelectMessage = ({ message, textAlign }) => {
  return (
    <View>
      {renderImage(message)}
      {message.body.choices.filter(c => c.selected).map(c =>
        <Text key={c.text} style={{ textAlign }}>
          {c.text}
        </Text>
      )}
    </View>
  )
}

const HeroMessage = ({ message, textAlign }) => {
  return (
    <View>
      {renderImage(message)}
      <Text style={{ textAlign }}>
        {message.body.text}
      </Text>
      <Image
        source={{ uri: message.body.imageUri }}
        style={{ height: 150, width: 300 }}
      />
    </View>
  )
}

const DefaultMessage = ({ message, textAlign }) => {
  return (
    <StyledDefaultMessage style={{ textAlign }}>
      {renderImage(message)}
      {message.body.text}
    </StyledDefaultMessage>
  )
}

const UserMessageMapping = {
  single_select: SelectMessage,
  multiple_select: SelectMessage
}

const HedvigMessageMapping = {
  hero: HeroMessage
}

const renderMessage = function(message, idx) {
  let fromMe = message.header.fromId !== 1
  let flexDirection = fromMe ? "row-reverse" : "row"
  let alignSelf = fromMe ? "flex-end" : "flex-start"
  let textAlign = fromMe ? "right" : "left"

  let MessageRenderComponent = DefaultMessage
  if (fromMe && UserMessageMapping.hasOwnProperty(message.body.type)) {
    MessageRenderComponent = UserMessageMapping[message.body.type]
  } else if (
    !fromMe &&
    HedvigMessageMapping.hasOwnProperty(message.body.type)
  ) {
    MessageRenderComponent = HedvigMessageMapping[message.body.type]
  }
  return (
    <View key={message.globalId || idx}>
      <StyledChatMessage
        style={{
          flexDirection: flexDirection,
          alignSelf: alignSelf
        }}
      >
        <MessageRenderComponent message={message} textAlign={textAlign} />
      </StyledChatMessage>
    </View>
  )
}

const renderMessages = function(messages) {
  return messages.map(renderMessage)
}

const MessageList = ({ messages }) => {
  return (
    <BaseScrollViewStyle
      innerRef={x => (this.ref = x)}
      onContentSizeChange={() => this.ref.scrollToEnd()}
    >
      {renderMessages(messages)}
    </BaseScrollViewStyle>
  )
}

export default MessageList
