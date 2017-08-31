import React from "react"
import { Text } from "react-native"
import { Textplainer } from "./Placeholder"
import { Placeholder } from "./Styles"

export default class ChangePayment extends React.Component {
  static navigationOptions = {
    title: "Ändra Autogiro"
  }

  render() {
    return (
      <Placeholder>
        <Textplainer text="Här kommer du kunna ändra autogiro-konto" />
      </Placeholder>
    )
  }
}
