import React from "react"
import { Text } from "react-native"
import { Link } from "../containers/Link"
import { HeaderRightChat } from "./NavBar"
import { Textplainer } from "./Placeholder"
import { Placeholder } from "./Styles"

export default class SignBankid extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Skriv Under Försäkring",
    headerRight: <HeaderRightChat navigation={navigation} />
  })

  render() {
    return (
      <Placeholder>
        <Textplainer text="Här kommer du kunna skriva under din försäkring med Hedvig med hjälp av BankID" />
        <Text>&nbsp;</Text>
        <Text>Här kommer du kunna få fullständiga villkor via e-post</Text>
        <Link to="FullTerms" title="Skicka avtal till min e-post" />
        <Text>&nbsp;</Text>
        <Text>Du kommer även kunna dela på Facebook, sms, etc</Text>
        <Link to="Share" title="Dela" />
        <Text>&nbsp;</Text>
        <Text>När du signerat kommer du se en översikt av din försäkring</Text>
        <Link
          to="Dashboard"
          title="Jag har signerat - Ta mig till min översikt"
        />
      </Placeholder>
    )
  }
}
