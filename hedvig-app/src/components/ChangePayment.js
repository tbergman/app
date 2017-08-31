import React from "react"
import { Text } from "react-native"
import { Link } from "../containers/Link"
import { Placeholder } from "./Styles"

export default class ChangePayment extends React.Component {
  static navigationOptions = {
    title: "Ändra Autogiro"
  }

  render() {
    return (
      <Placeholder>
        <Text>Här kommer du kunna ändra autogiro</Text>
      </Placeholder>
    )
  }
}
