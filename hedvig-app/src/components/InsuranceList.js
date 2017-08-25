import React from "react"
import { Text } from "react-native"
import Link from "../containers/Link"
import { Placeholder } from "./Styles"

export default class InsuranceList extends React.Component {
  static navigationOptions = {
    title: "Insurance List"
  }

  render() {
    return (
      <Placeholder>
        <Text>Insurance List</Text>
        <Link to="AddEditInsurance" title="Add / Edit insurance" />
      </Placeholder>
    )
  }
}
