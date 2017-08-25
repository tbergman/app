import React from "react"
import { Text } from "react-native"
import Link from "../containers/Link"
import { Placeholder } from "./Styles"

export default class RegisterCashback extends React.Component {
  static navigationOptions = {
    title: "Register Cashback"
  }

  render() {
    return (
      <Placeholder>
        <Text>Register Cashback</Text>
        <Link to="ChangeCashback" title="Change cashback" />
        <Link to="SignBankid" title="Sign with BankID" />
      </Placeholder>
    )
  }
}
