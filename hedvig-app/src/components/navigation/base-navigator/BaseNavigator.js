import React from "react"
import { TabNavigator } from "react-navigation"
import { ChatModalNavigator, HomeBase, StatusBar } from "../base"

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
    tabBarComponent: () => <StatusBar />,
    tabBarPosition: "top",
    swipeEnabled: false,
    animationEnabled: false,
    initialRouteName: "HomeBase",
    lazy: true
  },
)

export default BaseNavigator
