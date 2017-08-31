import React from "react"
import { Text } from "react-native"
import { Link } from "../containers/Link"
import { Placeholder } from "./Styles"

export default class ChangePayment extends React.Component {
  static navigationOptions = {
    title: "Change Payment"
  }

  render() {
    return (
      <Placeholder>
        <Text>Change Payment</Text>
      </Placeholder>
    )
  }
}
