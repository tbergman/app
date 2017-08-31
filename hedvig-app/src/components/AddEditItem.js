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
        <Text>Här lägger du till eller ändrar ett värdeförmål.</Text>
        <Link to="Claim" title="Claim" />
      </Placeholder>
    )
  }
}
