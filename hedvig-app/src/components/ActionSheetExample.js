import React from "react"
import { TouchableOpacity, Text, ActionSheetIOS } from "react-native"
import {
  ActionSheetProvider,
  connectActionSheet
} from "@expo/react-native-action-sheet"

class ActionSheetExample extends React.Component {
  _onPress() {
    this.props.showActionSheetWithOptions(
      {
        options: ["Option 1", "Option 2", "Cancel"],
        cancelButtonIndex: 2,
        title: "Title",
        message: "Message"
      },
      index => {
        console.log("You selected index", index)
      }
    )
  }

  render() {
    return (
      <TouchableOpacity onPress={this._onPress.bind(this)}>
        <Text>Click me</Text>
      </TouchableOpacity>
    )
  }
}

class ActionSheetWrapper extends React.Component {
  constructor() {
    super()
    this.WrappedComponent = connectActionSheet(ActionSheetExample)
  }
  render() {
    return (
      <ActionSheetProvider>
        <this.WrappedComponent />
      </ActionSheetProvider>
    )
  }
}

export default ActionSheetWrapper
