import React from "react"
import { Text } from "react-native"
import { Link } from "../containers/Link"
import { Textplainer } from "./Placeholder"
import { Placeholder } from "./Styles"

export default class InventoryList extends React.Component {
  static navigationOptions = {
    title: "Dina värdeföremål"
  }

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
