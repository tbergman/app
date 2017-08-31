import React from "react"
import { Text } from "react-native"
import { Link, ClaimLink } from "../containers/Link"
import { Textplainer } from "./Placeholder"
import { Placeholder } from "./Styles"

export default class AddEditItem extends React.Component {
  static navigationOptions = {
    title: "Lägg till / Ändra Värdeföremål"
  }

  render() {
    return (
      <Placeholder>
        <Textplainer text="Här kommer kunna lägga till, ändra eller se detaljer om ett
        värdeföremål." />
        <Text>&nbsp;</Text>
        <Text>
          Är detta föremål stulet eller har något hänt som du behöver hjälp med?
        </Text>
        <ClaimLink title="Rapportera ärende" />
      </Placeholder>
    )
  }
}
