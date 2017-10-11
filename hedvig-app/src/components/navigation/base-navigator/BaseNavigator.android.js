import React from "react"
import { Dimensions, View } from "react-native"
import { ChatModalNavigator, HomeBase, StatusBar } from "../base"

const BaseNavigator = ({ nav: { currentTab } }) => {
  let position = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  }
  let showHomeBaseStyle = Object.assign({}, position, {
    bottom: 0,
    height: currentTab === "dashboard" ? Dimensions.get("window").height : 0
  })
  let showChatBaseStyle = Object.assign({}, position, {
    bottom: 0,
    height: currentTab === "chat" ? Dimensions.get("window").height : 0
  })
  return (
    <View style={{ flex: 1, alignSelf: "stretch" }}>
      <StatusBar />
      <View style={showChatBaseStyle}>
        <ChatModalNavigator />
      </View>
      <View style={showHomeBaseStyle}>
        <HomeBase />
      </View>
    </View>
  )
}

export default BaseNavigator
