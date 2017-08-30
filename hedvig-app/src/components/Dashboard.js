import React from "react"
import { Button, Text } from "react-native"
import Link from "../containers/Link"
import { Placeholder } from "./Styles"

export default class Dashboard extends React.Component {
  static navigationOptions = {
    title: "Dashboard"
  }

  componentDidMount() {
    this.props.load()
  }

  createClaim() {
    this.props.createClaim()
  }

  render() {
    return (
      <Placeholder>
        <Text>
          Dashboard -&nbsp;
          {this.props.dashboard ? this.props.dashboard.data.foo : ":("}
        </Text>
        <Link to="Profile" title="My Profile" />
        <Link to="InventoryList" title="Inventory List" />
        <Link to="InsuranceList" title="Insurance List" />
        <Button title="Claim" onPress={this.createClaim.bind(this)} />
        <Link to="SignBankid" title="Update insurance" />
      </Placeholder>
    )
  }
}
