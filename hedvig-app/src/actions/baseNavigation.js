import { Platform } from "react-native"
import { types } from "hedvig-redux"

export function showChatAction() {
  if (Platform.OS === "ios") {
    return {
      type: "Navigation/NAVIGATE",
      routeName: "ChatBase",
      action: {
        type: "Navigation/NAVIGATE",
        routeName: "ChatBase"
      }
    }
  } else if (Platform.OS === "android") {
    return { type: types.SWITCH_BASE, payload: "chat" }
  }
}

export function showDashboardAction() {
  if (Platform.OS === "ios") {
    return {
      type: "Navigation/NAVIGATE",
      routeName: "HomeBase",
      action: {
        type: "Navigation/NAVIGATE",
        routeName: "HomeBase"
      }
    }
  } else if (Platform.OS === "android") {
    return { type: types.SWITCH_BASE, payload: "dashboard" }
  }
}
