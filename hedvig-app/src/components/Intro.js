import React from "react"
import { Text, View } from "react-native"
import Chat from "./Chat"
import Link from "../containers/Link"
import { BaseViewStyle } from "./Styles"
import Placeholder from "rn-placeholder"

export default class Intro extends React.Component {
  static navigationOptions = {
    title: "Intro"
  }

  constructor() {
    super()
    this.state = {
      ready: false
    }
  }

  wait() {
    setTimeout(() => {
      this.setState({
        ready: true
      })
    }, 2000)
  }

  render() {
    this.wait()
    return (
      <View style={{ flex: 1 }}>
        <Text>Intro</Text>
        <Chat />
      </View>
    )
  }
}
