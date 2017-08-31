import React from "react"
import { Text } from "react-native"
import { Link } from "../containers/Link"
import { Placeholder } from "./Styles"

export default class ChangeCashback extends React.Component {
  static navigationOptions = {
    title: "Ändra Cashback"
  }

  render() {
    return (
      <Placeholder>
        <Text>Här kommer du kunna ändra var din cashback betalas ut.</Text>
        <Text>
          Du kommer kunna välja på att ge till välgörenhet eller betala ut till
          ditt autogiro-konto
        </Text>
      </Placeholder>
    )
  }
}
