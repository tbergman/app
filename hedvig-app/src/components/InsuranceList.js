import React from "react"
import { Text } from "react-native"
import { Link } from "../containers/Link"
import { HeaderRightChat } from "./NavBar"
import { Textplainer } from "./Placeholder"
import { Placeholder } from "./Styles"

export default class InsuranceList extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Detaljer om din Försäkring",
    headerRight: <HeaderRightChat navigation={navigation} />
  })

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
