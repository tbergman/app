import React from "react"
import { Text } from "react-native"
import { Link, ClaimLink } from "../containers/Link"
import { Placeholder } from "./Styles"

export default class AddEditInsurance extends React.Component {
  static navigationOptions = {
    title: "Lägg till / Ändra Försäkring"
  }

  render() {
    return (
      <Placeholder>
        <Text>Add / Edit Insurance</Text>
        <ClaimLink title="Rapportera ärende" />
      </Placeholder>
    )
  }
}
