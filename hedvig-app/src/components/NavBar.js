import React from "react"
import { TouchableHighlight } from "react-native"
import * as Navigation from "../services/Navigation"
import { FontAwesome } from "@expo/vector-icons"
import { EmptyHeaderItem, StyledNavBarContainer } from "./styles/navbar"
import { HedvigLogoBlue } from "./Icon"
import { StyledHeading } from "./styles/text"

export const NavBar = ({ title, headerLeft, headerRight }) => {
  let TitleComponent
  if (title) {
    TitleComponent = <StyledHeading>{title}</StyledHeading>
  } else {
    TitleComponent = <HedvigLogoBlue />
  }
  headerLeft = headerLeft || <EmptyHeaderItem />
  headerRight = headerRight || <EmptyHeaderItem />

  return (
    <StyledNavBarContainer>
      {headerLeft}
      {TitleComponent}
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
