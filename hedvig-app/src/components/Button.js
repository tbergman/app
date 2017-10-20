import React from "react"
import { Text, TouchableOpacity } from "react-native"
import {
  StyledButtonText,
  StyledButtonTextPrefix,
  StyledRoundedButton,
  StyledRoundedButtonText,
  StyledChatResponseButton
} from "./styles/button"

const hitSlop = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20
}

export const TextButton = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} hitSlop={hitSlop}>
      <StyledButtonText>{title}</StyledButtonText>
    </TouchableOpacity>
  )
}

export const RoundedButton = ({title, prefix, onPress, _ContainerComponent=StyledRoundedButton}) => {
  return (
    <_ContainerComponent onPress={onPress}>
      <StyledButtonText>
        {prefix && (<StyledButtonTextPrefix>{prefix} </StyledButtonTextPrefix>)}
        {title}
      </StyledButtonText>
    </_ContainerComponent>
  )
}

export const ChatResponseButton = ({title, prefix, onPress, _ContainerComponent}) =>
 RoundedButton({title, prefix, onPress, _ContainerComponent: StyledChatResponseButton})
