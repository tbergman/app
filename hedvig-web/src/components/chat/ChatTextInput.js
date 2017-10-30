import React from "react"

const ChatTextInput = ({ message, onChange, send }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Type here..."
        autoFocus={true}
        value={message._inputValue || ""}
        onChange={event => onChange(message, event.target.value)}
      />
      <button onClick={() => send(message)}>Send</button>
    </div>
  )
}

export default ChatTextInput
