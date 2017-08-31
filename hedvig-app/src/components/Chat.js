import React from "react"
import { Text, View, TouchableHighlight } from "react-native"
import Link from "../containers/Link"
import { BaseViewStyle, ChatMessageStyle } from "./Styles"
import Placeholder from "rn-placeholder"

export default class Chat extends React.Component {
  static navigationOptions = {
    title: "Chat"
  }

  constructor() {
    super()
    this.state = {
      ready: false
    }
  }

  renderTextMessage(message) {
    let flexDirection = message.header.fromMe ? "row-reverse" : "row"
    let alignSelf = message.header.fromMe ? "flex-end" : "flex-start"
    let textAlign = message.header.fromMe ? "right" : "left"
    return (
      <TouchableHighlight
        onPress={this.props.displayNextMessage}
        underlayColor="transparent"
      >
        <ChatMessageStyle
          style={{
            flexDirection: flexDirection,
            alignSelf: alignSelf
          }}
        >
          <Text style={{ textAlign: textAlign }}>
            {message.body.content}
          </Text>
        </ChatMessageStyle>
      </TouchableHighlight>
    )
  }

  renderLinkMessage(message) {
    return <Link to="Login" title="Login" />
  }

  maybeMessages() {
    if (!this.props.messages) {
      return
    }
    console.log(this.props.numVisibleMessages)
    let messages = this.props.messages
      .slice(0, this.props.numVisibleMessages)
      .map(message => {
        switch (message.header.type) {
          case "text":
            return this.renderTextMessage(message)
          case "link":
            return this.renderLinkMessage(message)
          default:
            console.log("Unknown message", message)
        }
      })

    return messages
  }

  render() {
    return (
      <BaseViewStyle>
        <Text>Chat</Text>
        {this.maybeMessages()}
      </BaseViewStyle>
    )
  }
}
