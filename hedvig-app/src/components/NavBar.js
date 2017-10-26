import React from "react"
import { TouchableHighlight, Text } from "react-native"
import * as Navigation from "../services/Navigation"
import { FontAwesome } from "@expo/vector-icons"
import { StyledNavBarContainer } from "./styles/navbar"
import { SendDisabledIconButton } from "./Button"
import { StyledHeading } from "./styles/text"

export const NavBar = ({title, headerLeft, headerRight}) => {
  title = title || "Title"
  headerLeft = headerLeft || <SendDisabledIconButton />
  headerRight = headerRight || <SendDisabledIconButton />

  return (
    <StyledNavBarContainer>
      {headerLeft}
      <StyledHeading>{title}</StyledHeading>
      {headerRight}
    </StyledNavBarContainer>
  )
}

export const HeaderRightChat = ({ navigation }) => {
  return (
    <TouchableHighlight
      onPress={() => {
        Navigation.navigateTo(navigation.dispatch, "Chat")
      }}
      style={{ marginRight: 10, justifyContent: "center" }}
      underlayColor="transparent"
      activeOpacity={0.5}
      hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
    >
      <FontAwesome name="comments" size={20} />
    </TouchableHighlight>
  )
}
