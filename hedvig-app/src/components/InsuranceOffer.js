import React from "react"
import { Text } from "react-native"
import { Link } from "../containers/Link"
import { Placeholder as PlaceholderStyle } from "./Styles"

export default class InsuranceOffer extends React.Component {
  static navigationOptions = {
    title: "Ditt Försäkringserbjudande"
  }

  render() {
    return (
      <PlaceholderStyle>
        <Text>Här kommer du se en sammanställning av ditt erbjudande</Text>
        <Link to="Profile" title="Ändra info om mig" />
        <Link to="InventoryList" title="Ändra min försäkring" />
        <Link to="InsuranceList" title="Uppdatera värdesaker" />
        <Text>-</Text>
        <Link to="RegisterPayment" title="Det ser fint ut" />
      </PlaceholderStyle>
    )
  }
}
