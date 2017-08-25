import React from "react"
import { Text } from "react-native"
import Link from "../containers/Link"
import { Placeholder } from "./Styles"

export default class SignBankid extends React.Component {
  static navigationOptions = {
    title: "Sign"
  }

  render() {
    return (
      <Placeholder>
        <Text>Sign with BankID</Text>
        <Link to="FullTerms" title="See full terms" />
        <Link to="Share" title="Share" />
      </Placeholder>
    )
  }
}
