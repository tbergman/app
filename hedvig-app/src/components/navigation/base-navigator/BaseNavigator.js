import React from "react"
import styled from "styled-components/native"
import { Constants } from "expo"
import { TabNavigator } from "react-navigation"
import { ChatModalNavigator, HomeBase } from "../base"

const UnStyledStatusBar = styled.View`
  background-color: transparent
  height: ${Constants.statusBarHeight || 20}
  justify-content: center
  align-items: center
`

const BaseNavigator = TabNavigator(
  {
    ChatBase: {
      screen: ChatModalNavigator
    },
    HomeBase: {
      screen: HomeBase
    }
  },
  {
    tabBarComponent: () => <UnStyledStatusBar />,
    tabBarPosition: "top",
    swipeEnabled: false,
    animationEnabled: false,
    initialRouteName: "HomeBase",
    lazy: true
  },
)

export default BaseNavigator
