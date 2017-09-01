import React from "react"
import { Text } from "react-native"
import { HeaderRightChat } from "./NavBar"
import { Textplainer } from "./Placeholder"
import { Placeholder } from "./Styles"

export default class ChangeCashback extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Ändra Cashback",
    headerRight: <HeaderRightChat navigation={navigation} />
  })

  render() {
    return (
      <Placeholder>
        <Textplainer text="Här kommer du kunna ändra var din cashback betalas ut." />
        <Text>
          Du kommer kunna välja på att ge till välgörenhet eller betala ut till
          ditt autogiro-konto
        </Text>
      </Placeholder>
    )
  }
}
