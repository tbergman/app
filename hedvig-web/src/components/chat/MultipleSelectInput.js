import React from "react"
import R from "ramda"
import { StyledOption } from "../styles/chat"

const MultipleSelectInput = ({ message, onChoiceSelected, done }) => {
  let opts = message.body.choices.map(choice => {
    return (
      <StyledOption
        key={choice.text}
        onClick={() => {
          onChoiceSelected(message, choice)
        }}
      >
        {choice.text} {choice.selected ? "✅" : "❌"}
      </StyledOption>
    )
  })
  return (
    <div>
      {opts}
      <button onClick={() => done(message)}>Send</button>
    </div>
  )
}

export default MultipleSelectInput
