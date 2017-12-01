import React from "react"

import {
  SendIconButton,
  InactiveSendIconButton,
  ExitIconButton
} from "../Button"
import { TextInputStyled } from "../styles/chat"

export default class ChatTextInput extends React.Component {
  componentDidMount() {
    if (this.input) {
      this.input.focus()
    }
  }

  componentDidUpdate() {
    if (this.input) {
      this.input.focus()
    }
  }

  render() {
    const { message, onChange, send, type = "text" } = this.props

    let SendButton = message._inputValue ? (
      <SendIconButton onClick={() => send(message)} />
    ) : (
      <InactiveSendIconButton />
    )
    let maybeCancelButton = message._inputValue ? (
      <ExitIconButton onClick={() => onChange(message, "")} />
    ) : null
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end"
        }}
      >
        <TextInputStyled
          type={type}
          placeholder="Skriv här..."
          innerRef={input => (this.input = input)}
          value={message._inputValue || ""}
          onChange={event => onChange(message, event.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10 }}>{maybeCancelButton}</div>
          {SendButton}
        </div>
      </div>
    )
  }
}
