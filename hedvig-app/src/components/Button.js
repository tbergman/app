import React from "react"
import { Text, TouchableOpacity } from "react-native"
import { StyledTextButtonText } from "./styles/button"

const hitSlop = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20
}

export const TextButton = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} hitSlop={hitSlop}>
      <StyledTextButtonText>{title}</StyledTextButtonText>
    </TouchableOpacity>
  )
}
