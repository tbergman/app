import React from "react"
import { Text } from "react-native"
import Link from "../containers/Link"
import { Placeholder } from "./Styles"

export default class AddEditItem extends React.Component {
  static navigationOptions = {
    title: "Add / Edit Item"
  }

  render() {
    return (
      <Placeholder>
        <Text>Add / Edit Item</Text>
      </Placeholder>
    )
  }
}
