import React from "react"
import { Link } from "../containers/Link"
import { Textplainer } from "./Placeholder"
import { Placeholder } from "./Styles"

export default class Login extends React.Component {
  static navigationOptions = {
    title: "Login"
  }

  render() {
    return (
      <Placeholder>
        <Textplainer text="Här kommer du logga in med BankID" />
        <Link to="Onboarding" title="Jag har loggat in" />
      </Placeholder>
    )
  }
}
