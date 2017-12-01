import React from "react"
import {
  TurquoiseRoundedButtonStyled,
  PurpleRoundedButtonStyled,
  BlackPurpleRoundedButtonStyled,
  BlackPurpleRoundedButtonWhiteBorderStyled,
  WhiteRoundedButtonStyled,
  InactiveWhiteRoundedButtonStyled,
  IconButtonStyled,
  InactiveIconButtonStyled
} from "./styles/button"

const defaultOnClick = () => {
  console.log("Button clicked")
}

// Regular rounded buttons

export const TurquoiseRoundedButton = ({ onClick, children }) => (
  <TurquoiseRoundedButtonStyled onClick={onClick || defaultOnClick}>
    {children || "No Content"}
  </TurquoiseRoundedButtonStyled>
)

export const BlackPurpleRoundedButton = ({ onClick, children }) => (
  <BlackPurpleRoundedButtonStyled onClick={onClick || defaultOnClick}>
    {children || "No Content"}
  </BlackPurpleRoundedButtonStyled>
)

export const BlackPurpleRoundedButtonWhiteBorder = ({ onClick, children }) => (
  <BlackPurpleRoundedButtonWhiteBorderStyled
    onClick={onClick || defaultOnClick}
  >
    {children || "No Content"}
  </BlackPurpleRoundedButtonWhiteBorderStyled>
)

export const PurpleRoundedButton = ({ onClick, children }) => (
  <PurpleRoundedButtonStyled onClick={onClick || defaultOnClick}>
    {children || "No Content"}
  </PurpleRoundedButtonStyled>
)

export const WhiteRoundedButton = ({ onClick, children }) => (
  <WhiteRoundedButtonStyled onClick={onClick || defaultOnClick}>
    {children || "No Content"}
  </WhiteRoundedButtonStyled>
)

export const InactiveWhiteRoundedButton = ({ onClick, children }) => (
  <InactiveWhiteRoundedButtonStyled onClick={onClick || defaultOnClick}>
    {children || "No Content"}
  </InactiveWhiteRoundedButtonStyled>
)

// Icon buttons

const IconButton = ({ onClick, iconUrl, size }) => (
  <IconButtonStyled
    iconUrl={iconUrl}
    size={size}
    onClick={onClick || defaultOnClick}
  />
)

const InactiveIconButton = ({ onClick, iconUrl, size }) => (
  <InactiveIconButtonStyled iconUrl={iconUrl} size={size} />
)

export const SendIconButton = ({ onClick }) =>
  IconButton({ iconUrl: "/assets/icons/chat/send.svg", onClick })

export const InactiveSendIconButton = ({ onClick }) =>
  InactiveIconButton({ iconUrl: "/assets/icons/chat/send_idle.svg", onClick })

export const ExitIconButton = ({ onClick }) =>
  IconButton({ iconUrl: "/assets/icons/chat/exit.svg", onClick })

export const ResetIconButton = ({ onClick }) =>
  IconButton({ iconUrl: "/assets/icons/chat/restart.svg", onClick })

export const EditIconButton = ({ onClick }) =>
  IconButton({
    iconUrl: "/assets/icons/chat/edit_last_message.svg",
    size: "medium",
    onClick
  })

// For storybook

export const ButtonsExample = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: 40
    }}
  >
    <TurquoiseRoundedButton>TurquoiseRoundedButton</TurquoiseRoundedButton>
    <br />

    <PurpleRoundedButton>PurpleRoundedButton</PurpleRoundedButton>
    <br />

    <BlackPurpleRoundedButton>
      BlackPurpleRoundedButton
    </BlackPurpleRoundedButton>
    <br />

    <BlackPurpleRoundedButtonWhiteBorder>
      BlackPurpleRoundedButtonWhiteBorder
    </BlackPurpleRoundedButtonWhiteBorder>
    <br />

    <WhiteRoundedButton>WhiteRoundedButton</WhiteRoundedButton>
    <br />

    <InactiveWhiteRoundedButton>
      InactiveWhiteRoundedButton
    </InactiveWhiteRoundedButton>
    <br />

    <h4>SendIconButton</h4>
    <SendIconButton />
    <br />

    <h4>InactiveSendIconButton</h4>
    <InactiveSendIconButton />
    <br />

    <h4>ExitIconButton</h4>
    <ExitIconButton />
    <br />

    <h4>ResetIconButton</h4>
    <ResetIconButton />
    <br />

    <h4>EditIconButton</h4>
    <EditIconButton />
  </div>
)
