import React from "react"
import { Text } from "react-native"
import { Link } from "../containers/Link"
import { Textplainer } from "./Placeholder"
import { Placeholder } from "./Styles"

export default class RegisterPayment extends React.Component {
  static navigationOptions = {
    title: "Registrera Autogiro"
  }

  render() {
    return (
      <Placeholder>
        <Textplainer text="Här kommer du kunna välja vilket konto du vill använda för in- och
          utbetalningar" />
        <Text>&nbsp;</Text>
        <Text>När du valt konto kommer du kunna ändra konto här:</Text>
        <Link to="ChangePayment" title="Ändra konto för autogiro" />
        <Text>&nbsp;</Text>
        <Text>När du är klar går du vidare här</Text>
        <Link to="RegisterCashback" title="Toppen, ta mig vidare" />
      </Placeholder>
    )
  }
}
