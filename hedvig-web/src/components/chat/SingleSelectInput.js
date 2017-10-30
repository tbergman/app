import R from "ramda"
import React from "react"
import { StyledOption } from "../styles/chat"

const SingleSelectInput = ({ message, selectChoice, done }) => {
  let opts = message.body.choices.map(choice => {
    let content
    if (choice.type === "link" && choice.webUrl !== null) {
      content = (
        <a href={choice.webUrl} target="_blank">
          {choice.text}
        </a>
      )
    } else {
      content = choice.text
    }
    return (
      <StyledOption
        key={choice.text}
        style={{ cursor: "pointer" }}
        onClick={() => {
          selectChoice(message, choice)
          done(message)
        }}
      >
        {content}
      </StyledOption>
    )
  })
  return <div>{opts}</div>
}

export default SingleSelectInput
