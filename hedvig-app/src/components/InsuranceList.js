import React from "react"
import { Text } from "react-native"
import { Link } from "../containers/Link"
import { Textplainer } from "./Placeholder"
import { Placeholder } from "./Styles"

export default class InsuranceList extends React.Component {
  static navigationOptions = {
    title: "Detaljer om din Försäkring"
  }

  render() {
    return (
      <Placeholder>
        <Textplainer text="Här kommer du se en sammanställning av vad din försäkring täcker." />
        <Link
          to="AddEditInsurance"
          title="Lägg till, titta på eller ändra din försäkring"
        />
      </Placeholder>
    )
  }
}
