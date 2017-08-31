import React from "react"
import { Text } from "react-native"
import { Link } from "../containers/Link"
import { Placeholder } from "./Styles"

export default class FullTerms extends React.Component {
  static navigationOptions = {
    title: "Fullständiga Villkor"
  }

  render() {
    return (
      <Placeholder>
        <Text>
          Här kommer en bekräftelse på att fullständiga villkor skickats till
          din e-post
        </Text>
      </Placeholder>
    )
  }
}
