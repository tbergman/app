import React from "react"
import { View } from "react-native"
import { TabNavigator, StackNavigator } from "react-navigation"

import { FloatingHomeButton } from "./floatingButtons"
import Chat from "../../containers/Chat"
import { MyTabNavigator } from "./tabs"
import { MyModalNavigator } from "./modal"

const HomeBaseNavigator = StackNavigator(
  {
    MyTabNavigator: {
      screen: MyTabNavigator
    },
    MyModal: {
      screen: MyModalNavigator
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
      {/* <FloatingChatButton navigation={navigation} /> */}
      <HomeBaseNavigator />
    </View>
  )
}

const ChatBase = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <FloatingHomeButton navigation={navigation} />
      <Chat />
    </View>
  )
}

const BaseNavigator = TabNavigator(
  {
    ChatBase: {
      screen: ChatBase
    },
    HomeBase: {
      screen: HomeBase
    }
  },
  {
    tabBarComponent: () => <View />,
    // tabBarPosition: "top",
    swipeEnabled: false,
    animationEnabled: false,
    initialRouteName: "HomeBase"
  }
)

export { HomeBase, ChatBase, BaseNavigator }
