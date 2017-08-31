import React from "react"
import { Text } from "react-native"
import Chat from "../containers/Chat"

export default class Onboarding extends React.Component {
  static navigationOptions = {
    title: "Onboarding"
  }

  componentDidMount() {
    this.props.load()
  }

  render() {
    return <Chat />
  }
}
