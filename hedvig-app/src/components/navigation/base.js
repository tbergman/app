import React from "react"
import { View, Text } from "react-native"
import { TabNavigator, StackNavigator } from "react-navigation"

import { FloatingHomeButton, FloatingChatButton } from "./floatingButtons"
import Chat from "../../containers/Chat"
import ChatModal from "./ChatModal"
import { Carousel } from "../Carousel"
import { MyTabNavigator } from "./tabs"
import { MyModalNavigator } from "./modal"
import StatusBar from "../../containers/StatusBar"
import Share from "../Share"

const HomeBaseNavigator = StackNavigator(
  {
    MyTabNavigator: {
      screen: MyTabNavigator
    },
    MyModal: {
      screen: MyModalNavigator
    },
    Carousel: {
      screen: Carousel
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
)

const HomeBase = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <FloatingChatButton />
      <HomeBaseNavigator />
    </View>
  )
}

const ChatBase = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <FloatingHomeButton />
      <Chat navigation={navigation} />
    </View>
  )
}

const ChatModalNavigator = StackNavigator(
  {
    Chat: { screen: ChatBase },
    ChatModal: {
      screen: ChatModal
    },
    Carousel: {
      screen: Carousel
    },
  },
  {
    initialRouteName: "Chat",
    mode: "modal",
    headerMode: "none"
  }
)

const BaseNavigator = TabNavigator(
  {
    ChatBase: {
      screen: ChatModalNavigator
    },
    HomeBase: {
      screen: HomeBase
    },
    Share: {
      screen: Share
    }
  },
  {
    tabBarComponent: () => <StatusBar />,
    tabBarPosition: "top",
    swipeEnabled: false,
    animationEnabled: false,
    initialRouteName: "HomeBase"
  }
)

export { HomeBase, ChatBase, BaseNavigator }
