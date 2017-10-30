import React from "react"

const ChatNumberInput = ({ message, onChange, send }) => {
  return (
    <div>
      <input
        type="number"
        placeholder="Type here..."
        autoFocus={true}
        value={message._inputValue || ""}
        onChange={event => onChange(message, event.target.value)}
      />
      <button onClick={() => send(message)}>Send</button>
    </div>
  )
}

export default ChatNumberInput
