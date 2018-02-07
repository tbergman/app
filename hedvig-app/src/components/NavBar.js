import React from "react"
import PropTypes from "prop-types"
import { TouchableHighlight } from "react-native"
import * as Navigation from "../services/Navigation"
import { FontAwesome } from "@expo/vector-icons"
import { EmptyHeaderItem, StyledNavBarContainer } from "./styles/navbar"
import { HedvigLogoBlue } from "./Icon"
import { StyledHeading } from "./styles/text"

const NavBar = ({ title, headerLeft, headerRight }) => (
  <StyledNavBarContainer>
    {headerLeft}
    {title ? <StyledHeading>{title}</StyledHeading> : <HedvigLogoBlue />}
    {headerRight}
  </StyledNavBarContainer>
)

NavBar.propTypes = {
  title: PropTypes.string,
  headerLeft: PropTypes.element,
  headerRight: PropTypes.element
}

NavBar.defaultProps = {
  title: undefined,
  headerLeft: <EmptyHeaderItem />,
  headerRight: <EmptyHeaderItem />,
}

// TODO Proptypes
const HeaderRightChat = ({ navigation }) => {
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

export { NavBar, HeaderRightChat }
