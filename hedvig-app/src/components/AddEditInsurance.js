import React from "react"
import { Text } from "react-native"
import { Link, ClaimLink } from "../containers/Link"
import { HeaderRightChat } from "./NavBar"
import { Textplainer } from "./Placeholder"
import { Placeholder } from "./Styles"

export default class AddEditInsurance extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Lägg till / Ändra Försäkring",
    headerRight: <HeaderRightChat navigation={navigation} />
  })

  render() {
    return (
      <Placeholder>
        <Textplainer text="Här kommer du kunna lägga till, ändra eller se detaljer om något i din
          försäkring." />
        <Text>&nbsp;</Text>
        <Text>Har något hänt eller behöver du hjälp?</Text>
        <ClaimLink title="Rapportera ärende" />
      </Placeholder>
    )
  }
}
