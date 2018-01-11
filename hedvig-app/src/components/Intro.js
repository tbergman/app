import React from "react"
import { Text, View } from "react-native"
import Chat from "../containers/Chat"

export default class Intro extends React.Component {
  static navigationOptions = {
    title: "Intro"
  }

  constructor() {
    super()
    this.state = {
      // ready: false
      ready: true
    }
  }

  componentDidMount() {
    this.props.load()
  }

  wait() {
    setTimeout(() => {
      this.setState({
        ready: true
      })
    }, 2000)
  }

  render() {
    // this.wait()
    return (
      <View style={{ flex: 1 }}>
        <Text>Intro</Text>
        <Chat />
      </View>
    )
  }
}
