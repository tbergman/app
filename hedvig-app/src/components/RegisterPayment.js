import React from "react"
import { Text } from "react-native"
import { Link } from "../containers/Link"
import { Placeholder } from "./Styles"

export default class RegisterPayment extends React.Component {
  static navigationOptions = {
    title: "Register Payment"
  }

  render() {
    return (
      <Placeholder>
        <Text>Register Payment</Text>
        <Link to="ChangePayment" title="Change payment" />
        <Link to="RegisterCashback" title="Register cashback" />
      </Placeholder>
    )
  }
}
