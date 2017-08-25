import React from "react"
import { Text } from "react-native"
import Link from "../containers/Link"
import { Placeholder } from "./Styles"

export default class InsuranceOffer extends React.Component {
  static navigationOptions = {
    title: "Insurance Offer"
  }

  render() {
    return (
      <Placeholder>
        <Text>Insurance Offer</Text>
        <Link to="Profile" title="My Profile" />
        <Link to="InventoryList" title="Inventory List" />
        <Link to="InsuranceList" title="Insurance List" />
        <Link to="RegisterPayment" title="Register Payment" />
      </Placeholder>
    )
  }
}
