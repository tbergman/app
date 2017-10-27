import React from "react"
import { Text, TouchableOpacity, Image } from "react-native"
import {
  StyledButton,
  StyledDisabledButton,
  StyledButtonText,
  StyledButtonTextInverted,
  StyledButtonTextPrefix,
  StyledRoundedButton,
  StyledRoundedButtonInverted,
  StyledChatResponseButton,
  StyledMultipleSelectOptionButton,
  StyledFabButton
} from "./styles/button"
import { StyledDialogButton, StyledDialogButtonText } from "./styles/dialog"

const hitSlop = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20
}

export const Button = ({onPress, children}) => {
  return (
    <TouchableOpacity onPress={onPress} hitSlop={hitSlop}>
      {children}
    </TouchableOpacity>
  )
}

export const TextButton = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} hitSlop={hitSlop}>
      <StyledButtonText>{title}</StyledButtonText>
    </TouchableOpacity>
  )
}

export const RoundedButtonWithChildren = ({onPress, children}) => {
  return (
    <StyledRoundedButton onPress={onPress}>
      {children}
    </StyledRoundedButton>
  )
}

export const RoundedInvertedButtonWithChildren = ({onPress, children}) => {
  return (
    <StyledRoundedButtonInverted onPress={onPress} hitSlop={hitSlop}>
      {children}
    </StyledRoundedButtonInverted>
  )
}

export const RoundedButton = ({title, prefix, onPress, selected=false, _ContainerComponent=RoundedButtonWithChildren, _TextComponent=StyledButtonText}) => {
  return (
    <_ContainerComponent onPress={onPress} selected={selected}>
      <_TextComponent>
        {prefix && (<StyledButtonTextPrefix>{prefix} </StyledButtonTextPrefix>)}
        {title}
      </_TextComponent>
    </_ContainerComponent>
  )
}

export const SingleSelectOptionButton = ({title, prefix, onPress, selected}) =>
  RoundedButton({title, prefix, onPress, selected, _ContainerComponent: StyledChatResponseButton})

export const MultipleSelectOptionButton = ({title, prefix, onPress, selected}) => {
  return (
    <StyledMultipleSelectOptionButton
      onPress={onPress}
      selected={selected}
      underlayColor="transparent"
      activeOpacity={0.5}
    >
      <StyledButtonText>
        {prefix && (<StyledButtonTextPrefix>{prefix} </StyledButtonTextPrefix>)}
        {title}
      </StyledButtonText>
    </StyledMultipleSelectOptionButton>
  )
}


export const TextInputSubmitButton = ({title, prefix, onPress}) =>
  RoundedButton({
    title,
    prefix,
    onPress,
    _ContainerComponent: RoundedInvertedButtonWithChildren,
    _TextComponent: StyledButtonTextInverted
  })


// Dialog

export const DialogButton = ({title, onPress, borderRight=false}) => {
  return (
    <StyledDialogButton onPress={onPress} borderRight={borderRight}>
      <StyledDialogButtonText>{title}</StyledDialogButtonText>
    </StyledDialogButton>
  )
}

// Icon buttons

export const IconButton = ({iconModule, onPress, size="big", _ButtonComponent=StyledButton}) => {
  let width = {
    small: 16,
    medium: 20,
    big: 40
  }[size]
  return (
    <_ButtonComponent onPress={onPress} hitSlop={hitSlop}>
      <Image source={iconModule} style={{width: width, height: width}} />
    </_ButtonComponent>
  )
}

export const DisabledIconButton = ({iconModule}) =>
  IconButton({iconModule, _ButtonComponent: StyledDisabledButton})

export const SendIconButton = ({onPress}) =>
  <IconButton iconModule={require("../../assets/icons/chat/send.png")} onPress={onPress} />

export const SendDisabledIconButton = () =>
  <DisabledIconButton iconModule={require("../../assets/icons/chat/send_idle.png")} />

export const ChatNavDashboardButton = ({onPress}) =>
  <IconButton iconModule={require("../../assets/icons/chat/to_dashboard.png")} onPress={onPress} />

export const ChatNavRestartButton = ({onPress}) =>
  <IconButton iconModule={require("../../assets/icons/chat/restart.png")} onPress={onPress} />

// Fabs

const FabButton = ({iconModule, onPress}) =>
  IconButton({iconModule, onPress, _ButtonComponent: StyledFabButton})

export const DashboardFabButton = ({onPress}) =>
  <FabButton iconModule={require("../../assets/buttons/fab/close_fab.png")} onPress={onPress} />

export const ChatFabButton = ({onPress}) =>
  <FabButton iconModule={require("../../assets/buttons/fab/open_fab.png")} onPress={onPress} />
