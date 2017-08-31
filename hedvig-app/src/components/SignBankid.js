import React from "react"
import { Text } from "react-native"
import { Link } from "../containers/Link"
import { Placeholder } from "./Styles"

export default class SignBankid extends React.Component {
  static navigationOptions = {
    title: "Skriv Under Försäkring"
  }

  render() {
    return (
      <Placeholder>
        <Text>
          Här kommer du kunna skriva under din försäkring med Hedvig m.h.a.
          BankID
        </Text>
        <Text>&nbsp;</Text>
        <Text>Här kommer du kunna få fullständig information via e-post</Text>
        <Link to="FullTerms" title="Skicka avtal till min e-post" />
        <Text>&nbsp;</Text>
        <Text>Du kommer även kunna dela Hedvig här</Text>
        <Link to="Share" title="Dela" />
        <Text>&nbsp;</Text>
        <Text>
          När du signerat kommer du komma se en översikt över din försäkring
        </Text>
        <Link to="Dashboard" title="Gå till min översikt" />
      </Placeholder>
    )
  }
}
