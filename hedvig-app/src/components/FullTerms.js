import React from "react"
import { Text } from "react-native"
import { Link } from "../containers/Link"
import { Placeholder } from "./Styles"

export default class FullTerms extends React.Component {
  static navigationOptions = {
    title: "Full Terms"
  }

  render() {
    return (
      <Placeholder>
        <Text>Full Terms</Text>
      </Placeholder>
    )
  }
}
