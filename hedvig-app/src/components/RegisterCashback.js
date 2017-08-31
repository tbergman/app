import React from "react"
import { Text } from "react-native"
import { Link } from "../containers/Link"
import { Placeholder } from "./Styles"

export default class RegisterCashback extends React.Component {
  static navigationOptions = {
    title: "Registrera Cashback"
  }

  render() {
    return (
      <Placeholder>
        <Text>Här kommer du kunna välja var din cashback ska betalas ut.</Text>
        <Text>
          Du kommer kunna välja på att ge till välgörenhet eller betala ut till
          ditt autogiro-konto
        </Text>
        <Text>-</Text>
        <Text>
          När du valt sätt som din cashback betalas ut kommer du kunna ändra
          valet här
        </Text>
        <Link to="ChangeCashback" title="Ändra konto för cashback" />
        <Text>-</Text>
        <Text>När du är nöjd trycker du här</Text>
        <Link to="SignBankid" title="Gå vidare till signering" />
      </Placeholder>
    )
  }
}
