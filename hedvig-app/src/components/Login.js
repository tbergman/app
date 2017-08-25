import React from "react"
import { Text } from "react-native"
import Link from "../containers/Link"
import { Placeholder } from "./Styles"

export default class Login extends React.Component {
  static navigationOptions = {
    title: "Login"
  }

  render() {
    return (
      <Placeholder>
        <Text>Login</Text>
        <Link to="Onboarding" title="Onboarding" />
        <Link to="Dashboard" title="Dashboard" />
      </Placeholder>
    )
  }
}
