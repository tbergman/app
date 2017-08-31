import React from "react"
import { Text } from "react-native"
import { Link } from "../containers/Link"
import { Textplainer } from "./Placeholder"
import { Placeholder } from "./Styles"

export default class RegisterCashback extends React.Component {
  static navigationOptions = {
    title: "Registrera Cashback"
  }

  render() {
    return (
      <Placeholder>
        <Textplainer text="Här kommer vi förklara vad cashback är och hur du väljer vart den ska betalas ut." />
        <Text>
          Du kan välja mellan att betala ut till välgörenhet eller ditt
          autogiro-konto.
        </Text>
        <Text>&nbsp;</Text>
        <Text>Valet du gjort kan ändras här:</Text>
        <Link to="ChangeCashback" title="Ändra konto för cashback" />
        <Text>&nbsp;</Text>
        <Text>När du är nöjd trycker du här</Text>
        <Link to="SignBankid" title="Ta mig vidare till signering" />
      </Placeholder>
    )
  }
}
