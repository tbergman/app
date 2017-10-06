import React from "react"
import { Text } from "react-native"
import { Link } from "../containers/Link"
import { Placeholder as PlaceholderStyle } from "./Styles"
import { Textplainer } from "./Placeholder"
import Placeholder from "rn-placeholder"

export default class InsuranceOffer extends React.Component {
  static navigationOptions = {
    title: "Ditt Försäkringserbjudande"
  }

  render() {
    return (
      <PlaceholderStyle>
        <Textplainer text="Här kommer du se en sammanställning av ditt försäkringserbjudande från Hedvig" />
        <Link to="Profile" title="Ändra info om mig" />
        <Link to="InsuranceList" title="Ändra min försäkring" />
        <Link to="AssetList" title="Uppdatera värdesaker" />
        <Text>&nbsp;</Text>
        <Text>Är du nöjd med förslaget?</Text>
        <Link to="RegisterPayment" title="Ja, ta mig vidare" />
        <Link to="Chat" title="Nej, jag vill prata vidare med Hedvig" />
      </PlaceholderStyle>
    )
  }
}
