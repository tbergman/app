import React from "react"
import { Text } from "react-native"
import { Link } from "../containers/Link"
import { Placeholder } from "./Styles"

export default class Share extends React.Component {
  static navigationOptions = {
    title: "Dela"
  }

  render() {
    return (
      <Placeholder>
        <Text>Här kommer du kunna dela Hedvig</Text>
        <Link to="Dashboard" title="Gå till min översikt" />
      </Placeholder>
    )
  }
}
