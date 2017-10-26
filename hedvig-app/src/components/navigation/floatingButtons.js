import React from "react"
import { Text, TouchableHighlight } from "react-native"
import { types, chatActions } from "hedvig-redux"
import { connect } from "react-redux"
import {
  showDashboardAction
} from "../../actions/baseNavigation"
import { DashboardFabButton, ChatFabButton } from "../Button"

const FloatingChatButtonComponent = ({
  dispatch,
  bottom = 20,
  right = 20,
  zIndex = 100
}) => {
  return (
    <ChatFabButton onPress={() => dispatch(chatActions.apiAndNavigateToChat({
      method: "POST",
      url: "/chat/main",
      body: null,
      SUCCESS: "INITIATED_CHAT_MAIN"
    }))} />
  )
}

const FloatingChatButton = connect()(FloatingChatButtonComponent)

const FloatingHomeButtonComponent = ({dispatch}) =>
  <DashboardFabButton onPress={() => dispatch(showDashboardAction())} />

const FloatingHomeButton = connect()(FloatingHomeButtonComponent)

export { FloatingHomeButton, FloatingChatButton }
