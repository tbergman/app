import React from "react"
import { Text } from "react-native"
import Link from "../containers/Link"
import { Placeholder } from "./Styles"

export default class InventoryList extends React.Component {
  static navigationOptions = {
    title: "Inventory List"
  }

  render() {
    return (
      <Placeholder>
        <Text>Inventory List</Text>
        <Link to="AddEditItem" title="Add / Edit item" />
      </Placeholder>
    )
  }
}
