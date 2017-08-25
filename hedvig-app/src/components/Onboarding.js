import React from "react"
import { Text } from "react-native"
import Link from "../containers/Link"
import { Placeholder } from "./Styles"

export default class Onboarding extends React.Component {
  static navigationOptions = {
    title: "Onboarding"
  }

  render() {
    return (
      <Placeholder>
        <Text>Onboarding</Text>
        <Link to="Profile" title="My Profile" />
        <Link to="AddEditItem" title="Add / Edit item" />
        <Link to="InsuranceOffer" title="Insurance offer" />
        <Link to="InsuranceDenial" title="Insurance denial" />
      </Placeholder>
    )
  }
}
