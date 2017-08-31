import React from "react"
import { Text } from "react-native"
import { Link, ClaimLink } from "../containers/Link"
import { Placeholder } from "./Styles"

export default class AddEditItem extends React.Component {
  static navigationOptions = {
    title: "Add / Edit Item"
  }

  render() {
    return (
      <Placeholder>
        <Text>
          Här kommer kunna lägga till, ändra eller se detaljer om ett
          värdeföremål.
        </Text>
        <Text>&nbsp;</Text>
        <Text>Har något hänt rörande denna detta värdeföremål?</Text>
        <ClaimLink title="Rapportera ärende" />
      </Placeholder>
    )
  }
}
