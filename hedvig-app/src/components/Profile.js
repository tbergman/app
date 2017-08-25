import React from "react"
import { Text } from "react-native"
import Link from "../containers/Link"
import { Placeholder } from "./Styles"

export default class Profile extends React.Component {
  static navigationOptions = {
    title: "My Profile"
  }

  render() {
    return (
      <Placeholder>
        <Text>My Profile</Text>
        <Link to="ChangePayment" title="Change payment" />
        <Link to="ChangeCashback" title="Change cashback" />
      </Placeholder>
    )
  }
}
