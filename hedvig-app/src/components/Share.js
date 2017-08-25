import React from "react"
import { Text } from "react-native"
import Link from "../containers/Link"
import { Placeholder } from "./Styles"

export default class Share extends React.Component {
  static navigationOptions = {
    title: "Share"
  }

  render() {
    return (
      <Placeholder>
        <Text>Share</Text>
        <Link to="Dashboard" title="Go to dashboard" />
      </Placeholder>
    )
  }
}
