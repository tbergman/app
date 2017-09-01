import React from "react"
import { TouchableHighlight } from "react-native"
import * as Navigation from "../services/Navigation"
import { FontAwesome } from "@expo/vector-icons"

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
