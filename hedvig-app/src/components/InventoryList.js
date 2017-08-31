import React from "react"
import { Text } from "react-native"
import { Link } from "../containers/Link"
import { Placeholder } from "./Styles"

export default class InventoryList extends React.Component {
  static navigationOptions = {
    title: "Försäkringsinnehåll"
  }

  render() {
    return (
      <Placeholder>
        <Text>Här kommer du se vad som ingår i din försäkring</Text>
        <Link
          to="AddEditInsurance"
          title="Lägg till eller ändra i försäkring"
        />
      </Placeholder>
    )
  }
}
