import React from "react"
import { View, Image, Dimensions, Keyboard } from "react-native"
import { BaseScrollViewStyle } from "../Styles"
import {
  StyledDefaultMessageText,
  StyledDefaultUserMessageText,
  AnimatedStyledChatMessage,
  StyledUserChatMessage,
  StyledHeroMessage,
  StyledAvatarContainer
} from "../styles/chat"
import EditMessageButton from "../../containers/chat/EditMessageButton"
import Avatar from "../../containers/chat/Avatar"
import LoadingIndicator from "../../containers/chat/LoadingIndicator"
import { theme } from "hedvig-style"
import { registerOnScrollToEndEvent, unregisterOnScrollToEndEvent } from "../../services/MessageListScroll"

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

const DefaultHedvigMessage = ({ message, textAlign }) => {
  if (message.body.text === "") {
    return null
  } else {
    return (
      <AnimatedStyledChatMessage>
        {renderImage(message)}
        <StyledDefaultMessageText style={{ textAlign }}>
          {message.body.text}
        </StyledDefaultMessageText>
      </AnimatedStyledChatMessage>
    )
  }
}

const DefaultUserMessage = ({ message, textAlign }) => {
  let maybeEditMessageButton
  if (message.header.editAllowed) {
    maybeEditMessageButton = (
      <View
        style={{
          marginLeft: 10,
          marginBottom: 10
        }}
      >
        <EditMessageButton />
      </View>
    )
  }
  return (
    <View
      style={{
        flexDirection: "row-reverse",
        alignItems: "center",
        maxWidth: "88%"
      }}
    >
      {maybeEditMessageButton}
      <StyledUserChatMessage>
        <StyledDefaultUserMessageText style={{ textAlign }}>
          {message.body.text}
        </StyledDefaultUserMessageText>
      </StyledUserChatMessage>
    </View>
  )
}

const UserMessageMapping = {}

const HedvigMessageMapping = {
  hero: HeroMessage,
  bankid_collect: () => null // <-- This is how to not render certain types of messages from Hedvig
}

const renderMessage = function(message, idx, lastIndex = false) {
  let fromMe = message.header.fromId !== 1
  let flexDirection = fromMe ? "row-reverse" : "row"
  let alignSelf = fromMe ? "flex-end" : "flex-start"
  let textAlign = fromMe ? "right" : "left"

  let MessageRenderComponent
  if (!fromMe) {
    MessageRenderComponent = DefaultHedvigMessage
    if (HedvigMessageMapping.hasOwnProperty(message.body.type)) {
      MessageRenderComponent = HedvigMessageMapping[message.body.type]
    }
  } else {
    MessageRenderComponent = DefaultUserMessage
    if (UserMessageMapping.hasOwnProperty(message.body.type)) {
      MessageRenderComponent = UserMessageMapping[message.body.type]
    }
  }

  let avatar =
    lastIndex && message.header.avatarName ? (
      <StyledAvatarContainer>
        <Avatar messageIndex={idx} />
      </StyledAvatarContainer>
    ) : null
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
      {lastIndex ? <LoadingIndicator messageIndex={idx} /> : null}
    </View>
  )
}

const renderMessages = function(messages) {
  return messages.map((message, idx) => {
    let lastIndex = idx === messages.length - 1
    return renderMessage(message, idx, lastIndex)
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
    // TODO: Unregister this listener on componentWillUnmount
    registerOnScrollToEndEvent(this._scrollToEnd)
  }

  _scrollToEnd = () => {
      if (this.ref) {
        this.ref.scrollToEnd()
      }
    }

  componentWillUnmount() {
    if (this.keyboardDidShowListener) {
      this.keyboardDidShowListener.remove()
    }
    if (this.keyboardDidHideListener) {
      this.keyboardDidHideListener.remove()
    }
    unregisterOnScrollToEndEvent(this.scrollToEnd)
  }

  handleKeyboardStateChange(event) {
    if (this.ref) {
      setTimeout(this.ref.scrollToEnd, 0)
    }
  }

  render() {
    return (
      <BaseScrollViewStyle
        showsVerticalScrollIndicator={false}
        innerRef={x => (this.ref = x)}
        onContentSizeChange={() => this.ref.scrollToEnd()}
      >
        {renderMessages(this.props.messages)}
      </BaseScrollViewStyle>
    )
  }
}
