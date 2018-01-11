import React from "react"
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
