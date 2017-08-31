import React from "react"
import { Text } from "react-native"
import { Link } from "../containers/Link"
import { Placeholder } from "./Styles"

export default class Claim extends React.Component {
  static navigationOptions = {
    title: "Claim"
  }

  render() {
    return (
      <Placeholder>
        <Text>Claim</Text>
      </Placeholder>
    )
  }
}
