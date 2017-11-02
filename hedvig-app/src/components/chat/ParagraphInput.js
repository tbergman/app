import React from "react"
import { Text, View, TouchableOpacity } from "react-native"

export default class ParagraphInput extends React.Component {
  componentDidMount() {
    this.props.startPolling(this.props.message.header.pollingInterval)
  }

  componentWillUnmount() {
    this.props.stopPolling()
  }

  render() {
    return <View />
  }
}
