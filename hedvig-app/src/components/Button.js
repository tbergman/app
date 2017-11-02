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
  StyledRedRoundedButtonInverted,
  StyledTurquoiseRoundedButtonInverted,
  StyledChatResponseButton,
  StyledTransparentButton,
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

export const Button = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress} hitSlop={hitSlop}>
      {children}
    </TouchableOpacity>
  )
}

export const TextButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} hitSlop={hitSlop}>
      <StyledButtonText>{title}</StyledButtonText>
    </TouchableOpacity>
  )
}

export const RoundedButtonWithChildren = ({ onPress, children }) => {
  return <StyledRoundedButton onPress={onPress}>{children}</StyledRoundedButton>
}

export const RoundedInvertedButtonWithChildren = ({ onPress, children }) => {
  return (
    <StyledRoundedButtonInverted onPress={onPress} hitSlop={hitSlop}>
      {children}
    </StyledRoundedButtonInverted>
  )
}

export const RedRoundedInvertedButtonWithChildren = ({ onPress, children }) => {
  return (
    <StyledRedRoundedButtonInverted onPress={onPress} hitSlop={hitSlop}>
      {children}
    </StyledRedRoundedButtonInverted>
  )
}

export const TurquoiseRoundedInvertedButtonWithChildren = ({
  onPress,
  children
}) => {
  return (
    <StyledTurquoiseRoundedButtonInverted onPress={onPress} hitSlop={hitSlop}>
      {children}
    </StyledTurquoiseRoundedButtonInverted>
  )
}

export const RoundedInvertedButton = ({ title, onPress }) => {
  return (
    <RoundedInvertedButtonWithChildren onPress={onPress}>
      <StyledButtonText>{title}</StyledButtonText>
    </RoundedInvertedButtonWithChildren>
  )
}

export const RedRoundedInvertedButton = ({ title, onPress }) => {
  return (
    <RedRoundedInvertedButtonWithChildren onPress={onPress}>
      <StyledButtonTextInverted>{title}</StyledButtonTextInverted>
    </RedRoundedInvertedButtonWithChildren>
  )
}

export const TurquoiseRoundedInvertedButton = ({ title, onPress }) => {
  return (
    <TurquoiseRoundedInvertedButtonWithChildren onPress={onPress}>
      <StyledButtonTextInverted>{title}</StyledButtonTextInverted>
    </TurquoiseRoundedInvertedButtonWithChildren>
  )
}

export const RoundedButton = ({
  title,
  prefix,
  onPress,
  selected = false,
  _ContainerComponent = RoundedButtonWithChildren,
  _TextComponent = StyledButtonText
}) => {
  return (
    <_ContainerComponent onPress={onPress} selected={selected}>
      <_TextComponent>
        {prefix && <StyledButtonTextPrefix>{prefix} </StyledButtonTextPrefix>}
        {title}
      </_TextComponent>
    </_ContainerComponent>
  )
}

export const RoundedTransparentButton = ({
  title,
  prefix,
  onPress,
  selected
}) =>
  RoundedButton({
    title,
    prefix,
    onPress,
    selected,
    _ContainerComponent: StyledTransparentButton
  })

export const SingleSelectOptionButton = ({
  title,
  prefix,
  onPress,
  selected
}) =>
  RoundedButton({
    title,
    prefix,
    onPress,
    selected,
    _ContainerComponent: StyledChatResponseButton
  })

export const MultipleSelectOptionButton = ({
  title,
  prefix,
  onPress,
  selected
}) => {
  return (
    <StyledMultipleSelectOptionButton
      onPress={onPress}
      selected={selected}
      underlayColor="transparent"
      activeOpacity={0.5}
    >
      <StyledButtonText>
        {prefix && <StyledButtonTextPrefix>{prefix} </StyledButtonTextPrefix>}
        {title}
      </StyledButtonText>
    </StyledMultipleSelectOptionButton>
  )
}

export const TextInputSubmitButton = ({ title, prefix, onPress }) =>
  RoundedButton({
    title,
    prefix,
    onPress,
    _ContainerComponent: RoundedInvertedButtonWithChildren,
    _TextComponent: StyledButtonTextInverted
  })

// Dialog

export const DialogButton = ({ title, onPress, borderRight = false }) => {
  return (
    <StyledDialogButton onPress={onPress} borderRight={borderRight}>
      <StyledDialogButtonText>{title}</StyledDialogButtonText>
    </StyledDialogButton>
  )
}

// Icon buttons

export const IconButton = ({
  iconModule,
  onPress,
  width,
  size = "big",
  _ButtonComponent = StyledButton
}) => {
  width =
    width ||
    {
      small: 16,
      medium: 20,
      mediumBig: 24,
      big: 40,
      huge: 56
    }[size]
  return (
    <_ButtonComponent onPress={onPress} hitSlop={hitSlop}>
      <Image source={iconModule} style={{ width: width, height: width }} />
    </_ButtonComponent>
  )
}

export const DisabledIconButton = ({ iconModule, size }) =>
  IconButton({ iconModule, size, _ButtonComponent: StyledDisabledButton })

export const SendIconButton = ({ onPress }) => (
  <IconButton
    iconModule={require("../../assets/icons/chat/send.png")}
    onPress={onPress}
  />
)

export const SendDisabledIconButton = () => (
  <DisabledIconButton
    iconModule={require("../../assets/icons/chat/send_idle.png")}
  />
)

export const ChatNavDashboardButton = ({ onPress }) => (
  <IconButton
    iconModule={require("../../assets/icons/chat/to_dashboard.png")}
    onPress={onPress}
  />
)

export const ChatNavRestartButton = ({ onPress }) => (
  <IconButton
    iconModule={require("../../assets/icons/chat/restart.png")}
    onPress={onPress}
  />
)

export const ListNextButton = ({ onPress }) => (
  <IconButton
    iconModule={require("../../assets/icons/navigate_next.png")}
    onPress={onPress}
    size="mediumBig"
  />
)

export const DisabledListNextButton = () => (
  <DisabledIconButton
    iconModule={require("../../assets/icons/navigate_next.png")}
    size="mediumBig"
  />
)

export const DisabledCollapseButton = () => (
  <DisabledIconButton
    iconModule={require("../../assets/icons/collapse.png")}
    size="mediumBig"
  />
)

export const DisabledExpandButton = () => (
  <DisabledIconButton
    iconModule={require("../../assets/icons/expand.png")}
    size="mediumBig"
  />
)

export const AddButton = ({ onPress }) => (
  <IconButton
    iconModule={require("../../assets/buttons/add_item.png")}
    onPress={onPress}
    width={32}
  />
)

export const InputEditButton = ({ onPress }) => (
  <IconButton
    iconModule={require("../../assets/icons/list_items/edit_list_item.png")}
    onPress={onPress}
    size="mediumBig"
  />
)

export const InputDoneButton = ({ onPress }) => (
  <IconButton
    iconModule={require("../../assets/icons/list_items/done_edit_list_item.png")}
    onPress={onPress}
    size="mediumBig"
  />
)

export const NavigateBackButton = ({ onPress }) => (
  <IconButton
    iconModule={require("../../assets/icons/navigate_back.png")}
    onPress={onPress}
    size="mediumBig"
  />
)

export const DeleteButton = ({ onPress }) => (
  <IconButton
    iconModule={require("../../assets/icons/list_items/delete_item.png")}
    onPress={onPress}
    size="mediumBig"
  />
)

export const RecordButton = ({ onPress }) => (
  <IconButton
    iconModule={require("../../assets/icons/chat/record_audio.png")}
    onPress={onPress}
    size="huge"
  />
)

export const StopRecordingButton = ({ onPress }) => (
  <IconButton
    iconModule={require("../../assets/icons/chat/stop_record_audio.png")}
    onPress={onPress}
    size="huge"
  />
)

export const EditMessageButton = ({ onPress }) => (
  <IconButton
    iconModule={require("../../assets/icons/chat/edit_last_message.png")}
    onPress={onPress}
    size="mediumBig"
  />
)

// Fabs

const FabButton = ({ iconModule, onPress }) =>
  IconButton({
    iconModule,
    onPress,
    _ButtonComponent: StyledFabButton,
    size: "huge"
  })

export const DashboardFabButton = ({ onPress }) => (
  <FabButton
    iconModule={require("../../assets/buttons/fab/close_fab.png")}
    onPress={onPress}
  />
)

export const ChatFabButton = ({ onPress }) => (
  <FabButton
    iconModule={require("../../assets/buttons/fab/open_fab.png")}
    onPress={onPress}
  />
)
