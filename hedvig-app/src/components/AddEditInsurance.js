import React from "react"
import { Text } from "react-native"
import { Link, ClaimLink } from "../containers/Link"
import { Textplainer } from "./Placeholder"
import { Placeholder } from "./Styles"

export default class AddEditInsurance extends React.Component {
  static navigationOptions = {
    title: "Lägg till / Ändra Försäkring"
  }

  render() {
    return (
      <Placeholder>
        <Textplainer text="Här kommer du kunna lägga till, ändra eller se detaljer om något i din
          försäkring." />
        <Text>&nbsp;</Text>
        <Text>Har något hänt eller behöver du hjälp?</Text>
        <ClaimLink title="Rapportera ärende" />
      </Placeholder>
    )
  }
}
