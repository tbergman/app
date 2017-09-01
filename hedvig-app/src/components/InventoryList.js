import React from "react"
import { Text } from "react-native"
import { Link } from "../containers/Link"
import { HeaderRightChat } from "./NavBar"
import { Textplainer } from "./Placeholder"
import { Placeholder } from "./Styles"

export default class InventoryList extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Dina värdeföremål",
    headerRight: <HeaderRightChat navigation={navigation} />
  })

  render() {
    return (
      <Placeholder>
        <Textplainer text="Här kommer du se vad som ingår i din försäkring" />
        <Link
          to="AddEditInsurance"
          title="Lägg till, titta på eller ändra ett värdeföremål"
        />
      </Placeholder>
    )
  }
}
