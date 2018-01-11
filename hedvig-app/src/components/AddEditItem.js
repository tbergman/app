import React from "react"
import { Text } from "react-native"
import { ClaimLink } from "../containers/Link"
import { HeaderRightChat } from "./NavBar"
import { Textplainer } from "./Placeholder"
import { Placeholder } from "./Styles"

export default class AddEditItem extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Lägg till / Ändra Värdeföremål",
    headerRight: <HeaderRightChat navigation={navigation} />
  })

  render() {
    return (
      <Placeholder>
        <Textplainer text="Här kommer kunna lägga till, ändra eller se detaljer om ett värdeföremål." />
        <Text>&nbsp;</Text>
        <Text>
          Är detta föremål stulet eller har något hänt som du behöver hjälp med?
        </Text>
        <ClaimLink title="Rapportera ärende" />
      </Placeholder>
    )
  }
}
