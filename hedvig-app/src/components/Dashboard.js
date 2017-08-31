import React from "react"
import { Button, Text } from "react-native"
import { Link, ClaimLink } from "../containers/Link"
import { Textplainer } from "./Placeholder"
import { Placeholder as PlaceholderStyle } from "./Styles"
import Placeholder from "rn-placeholder"

export default class Dashboard extends React.Component {
  static navigationOptions = {
    title: "Din Försäkring"
  }

  render() {
    return (
      <PlaceholderStyle>
        <Textplainer text="Här kommer du se en sammanställning av din försäkring" />
        <Link to="Profile" title="Se / ändra info om mig" />
        <Link to="InsuranceList" title="Se / ändra min försäkring" />
        <Link to="InventoryList" title="Se / ändra värdesaker" />
        <Text>&nbsp;</Text>
        <Text>Har något hänt eller behöver du hjälp?</Text>
        <ClaimLink title="Rapportera händelse" />
        <Text>&nbsp;</Text>
        <Text>
          Om du uppdaterat din försäkring behöver du bekräfta uppdateringen här
        </Text>
        <Link to="SignBankid" title="Bekräfta uppdaterad försäkring" />
      </PlaceholderStyle>
    )
  }
}
