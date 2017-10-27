import React from "react"
import { Text, View, Image, Dimensions, Keyboard } from "react-native"
import { BaseScrollViewStyle } from "../Styles"
import {
  StyledDefaultMessageText,
  StyledChatMessage,
  StyledHeroMessage,
  StyledAvatarContainer
} from "../styles/chat"
import Avatar from "../../containers/chat/Avatar"
import { theme } from "hedvig-style"

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
    <StyledDefaultMessageText>
      {renderImage(message)}
      {message.body.choices.filter(c => c.selected).map(c =>
        <Text key={c.text} style={{ textAlign }}>
          {c.text}
        </Text>
      )}
    </StyledDefaultMessageText>
  )
}

const HeroMessage = ({ message, textAlign }) => {
  const window = Dimensions.get("window")
  // (window width - (2 outer margin + 2 inner margin) * 0.98)
  const imageWidth = Math.round(
    (window.width - 4 * theme.mobile.margin.medium) * 0.98
  )
  return (
    <StyledHeroMessage>
      {renderImage(message)}
      <StyledDefaultMessageText style={{ textAlign }}>
        {message.body.text}
      </StyledDefaultMessageText>
      <Image
        resizeMode="contain"
        source={{ uri: message.body.imageUri }}
        style={{ height: 200, width: imageWidth }}
      />
    </StyledHeroMessage>
  )
}

const DefaultMessage = ({ message, textAlign }) => {
  return (
    <StyledChatMessage>
      <StyledDefaultMessageText style={{ textAlign }}>
        {renderImage(message)}
        {message.body.text}
      </StyledDefaultMessageText>
    </StyledChatMessage>
  )
}

const UserMessageMapping = {
  single_select: SelectMessage,
  multiple_select: SelectMessage
}

const HedvigMessageMapping = {
  hero: HeroMessage
}

const renderMessage = function(message, idx, includeAvatar = false) {
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
  let avatar = includeAvatar
    ? <StyledAvatarContainer>
        <Avatar messageIndex={idx} />
      </StyledAvatarContainer>
    : null
  return (
    <View key={message.globalId || idx}>
      {avatar}
      <View
        style={{
          flexDirection: flexDirection,
          alignSelf: alignSelf
        }}
      >
        <MessageRenderComponent message={message} textAlign={textAlign} />
      </View>
    </View>
  )
}

const renderMessages = function(messages) {
  return messages.map((message, idx) => {
    let includeAvatar = idx === messages.length - 1
    return renderMessage(message, idx, includeAvatar)
  })
}

export default class MessageList extends React.Component {
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this.handleKeyboardStateChange.bind(this)
    )
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.handleKeyboardStateChange.bind(this)
    )
  }

  componentWillUnmount() {
    if (this.keyboardDidShowListener) {
      this.keyboardDidShowListener.remove()
    }
    if (this.keyboardDidHideListener) {
      this.keyboardDidHideListener.remove()
    }
  }

  handleKeyboardStateChange(event) {
    if (this.ref) {
      this.ref.scrollToEnd()
    }
  }

  render() {
    return (
      <BaseScrollViewStyle
        innerRef={x => (this.ref = x)}
        onContentSizeChange={() => this.ref.scrollToEnd()}
      >
        {renderMessages(this.props.messages)}
      </BaseScrollViewStyle>
    )
  }
}
