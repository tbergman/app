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
        <Text>
          Här kommer kunna lägga till, ändra eller se detaljer om något ur din
          färsäkring.
        </Text>
        <Text>&nbsp;</Text>
        <Text>Har något hänt rörande denna del i din försäkring?</Text>
        <ClaimLink title="Rapportera ärende" />
      </Placeholder>
    )
  }
}
