import React from "react"
import R from "ramda"
import { Text, View, TouchableOpacity } from "react-native"
import {
  StyledRightAlignedOptions,
  StyledOptionsContainer,
  StyledMarginContainer
} from "../styles/chat"
import {
  MultipleSelectOptionButton,
  SendIconButton,
  SendDisabledIconButton
} from "../Button"

const WRAP_NUM_OPTIONS = 6

const MultipleSelectInput = ({ message, onChoiceSelected, done }) => {
  let anyOptionSelected = R.any(choice => choice.selected, message.body.choices)
  let sendButton = anyOptionSelected ? (
    <SendIconButton
      onPress={() => {
        done(message)
      }}
    />
  ) : (
    <SendDisabledIconButton />
  )
  let opts = message.body.choices.map(choice => {
    return (
      <StyledRightAlignedOptions key={choice.text}>
        <MultipleSelectOptionButton
          onPress={() => {
            onChoiceSelected(message, choice)
          }}
          title={choice.text}
          selected={choice.selected}
        />
      </StyledRightAlignedOptions>
    )
  })
  let wrap = message.body.choices.length > WRAP_NUM_OPTIONS
  return (
    <StyledMarginContainer wrap={wrap}>
      <StyledOptionsContainer wrap={wrap}>{opts}</StyledOptionsContainer>
      <StyledRightAlignedOptions>{sendButton}</StyledRightAlignedOptions>
    </StyledMarginContainer>
  )
}

export default MultipleSelectInput
