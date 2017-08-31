import React from "react"
import { Button, Text } from "react-native"
import { Link, ClaimLink } from "../containers/Link"
import { Placeholder as PlaceholderStyle } from "./Styles"

export default class Dashboard extends React.Component {
  static navigationOptions = {
    title: "Din Föresäkring"
  }

  render() {
    return (
      <PlaceholderStyle>
        <Text>Här kommer du se en sammanställning av din försäkring</Text>
        <Link to="Profile" title="Se / ändra info om mig" />
        <Link to="InsuranceList" title="Se / ändra min försäkring" />
        <Link to="InventoryList" title="Se / ändra värdesaker" />
        <Text>&nbsp;</Text>
        <Text>Har något hänt? Tryck här:</Text>
        <ClaimLink title="Rapportera händelse" />
        <Text>&nbsp;</Text>
        <Text>
          Om du uppdaterat din försäkring kan du bekräfta uppdateringen här
        </Text>
        <Link to="SignBankid" title="Bekräfta uppdaterad försäkring" />
      </PlaceholderStyle>
    )
  }
}
