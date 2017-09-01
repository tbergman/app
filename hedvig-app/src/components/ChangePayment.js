import React from "react"
import { Text } from "react-native"
import { HeaderRightChat } from "./NavBar"
import { Textplainer } from "./Placeholder"
import { Placeholder } from "./Styles"

export default class ChangePayment extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Ändra Autogiro",
    headerRight: <HeaderRightChat navigation={navigation} />
  })

  render() {
    return (
      <Placeholder>
        <Textplainer text="Här kommer du kunna ändra autogiro-konto" />
      </Placeholder>
    )
  }
}
