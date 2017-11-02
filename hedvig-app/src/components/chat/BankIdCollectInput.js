import React from "react"
import { Text, View, TouchableOpacity } from "react-native"

export default class BankIdCollectInput extends React.Component {
  componentDidMount() {
    this.props.startCollecting(this.props.message.body.referenceId)
  }

  render() {
    return <View />
  }
}
