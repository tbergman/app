import React from "react"
import { Text } from "react-native"
import Link from "../containers/Link"
import { Placeholder } from "./Styles"

export default class AddEditInsurance extends React.Component {
  static navigationOptions = {
    title: "Add / Edit Insurance"
  }

  render() {
    return (
      <Placeholder>
        <Text>Add / Edit Insurance</Text>
        <Link to="Claim" title="Claim" />
      </Placeholder>
    )
  }
}
