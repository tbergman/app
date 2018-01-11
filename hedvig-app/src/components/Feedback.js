import React from "react"
import { Link } from "../containers/Link"
import { Textplainer } from "./Placeholder"
import { Placeholder } from "./Styles"

export default class Share extends React.Component {
  static navigationOptions = {
    title: "Feedback"
  }

  render() {
    return (
      <Placeholder>
        <Textplainer text="Här kommer du kunna lämna feedback till Hedvig" />
        <Link to="Dashboard" title="Gå till min översikt" />
      </Placeholder>
    )
  }
}
