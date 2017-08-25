import React from "react"
import { Text } from "react-native"
import Link from "../containers/Link"
import { Placeholder } from "./Styles"

export default class Intro extends React.Component {
  static navigationOptions = {
    title: "Intro"
  }

  render() {
    return (
      <Placeholder>
        <Text>Intro</Text>
        <Link to="Login" title="Login" />
      </Placeholder>
    )
  }
}
