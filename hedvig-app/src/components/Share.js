import React from "react"
import { Link } from "../containers/Link"
import { Textplainer } from "./Placeholder"
import { Placeholder } from "./Styles"

export default class Share extends React.Component {
  static navigationOptions = {
    title: "Dela"
  }

  render() {
    return (
      <Placeholder>
        <Textplainer text="Här kommer du kunna dela Hedvig" />
        <Link to="Dashboard" title="Gå till min översikt" />
      </Placeholder>
    )
  }
}
