import React from "react"
import { View } from "react-native"
import { StackNavigator } from "react-navigation"
import Dialog from "../../containers/Dialog"

import { FloatingHomeButton, FloatingChatButton } from "./floatingButtons"
import Chat from "../../containers/Chat"
import ChatModal from "../../containers/navigation/ChatModal"
import { Carousel } from "../Carousel"
import { MyTabNavigator } from "./tabs"
import { MyModalNavigator } from "./modal"
import StatusBar from "../../containers/StatusBar"
import AddEditAsset from "../../containers/asset-tracker/AddEditAsset"

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
    },
    AddEditAsset: {
      screen: AddEditAsset
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
)

/*
NOTE: The order of the floating buttons vs the other components in the
ChatBase and HomeBase below affects whether the floating buttons are visible
on Android!
*/
const HomeBase = ({navigation}) => {
  return (
    <View style={{ flex: 1 }}>
      <HomeBaseNavigator navigation={navigation}/>
      <FloatingChatButton />
      <Dialog />
    </View>
  )
}

HomeBase.router = HomeBaseNavigator.router

const ChatBase = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <Chat navigation={navigation} />
      <Dialog />
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
    }
  },
  {
    initialRouteName: "Chat",
    mode: "modal",
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false
    }
  }
)

export { HomeBase, ChatModalNavigator, StatusBar }
