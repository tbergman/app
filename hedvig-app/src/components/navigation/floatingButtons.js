import React from "react"
import { Text, TouchableHighlight } from "react-native"
import { connect } from "react-redux"

const FloatingChatButtonComponent = ({
  dispatch,
  bottom = 20,
  right = 20,
  zIndex = 100
}) => {
  return (
    <TouchableHighlight
      style={{
        position: "absolute",
        bottom,
        right,
        zIndex
      }}
      onPress={() =>
        dispatch({
          type: "Navigation/NAVIGATE",
          routeName: "ChatBase",
          action: {
            type: "Navigation/NAVIGATE",
            routeName: "ChatBase"
          }
        })}
    >
      <Text>Chat</Text>
    </TouchableHighlight>
  )
}

const FloatingChatButton = connect()(FloatingChatButtonComponent)

const FloatingHomeButtonComponent = ({
  dispatch,
  bottom = 20,
  right = 20,
  zIndex = 100
}) => {
  return (
    <TouchableHighlight
      style={{
        position: "absolute",
        bottom,
        right,
        zIndex
      }}
      onPress={() =>
        dispatch({
          type: "Navigation/NAVIGATE",
          routeName: "HomeBase",
          action: {
            type: "Navigation/NAVIGATE",
            routeName: "HomeBase"
          }
        })}
    >
      <Text>Dashboard</Text>
    </TouchableHighlight>
  )
}

const FloatingHomeButton = connect()(FloatingHomeButtonComponent)

export { FloatingHomeButton, FloatingChatButton }
