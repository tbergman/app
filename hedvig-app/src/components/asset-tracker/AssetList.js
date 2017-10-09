import React from "react"
import { Button, Text, FlatList, TouchableOpacity, View } from "react-native"
import { Link } from "../../containers/Link"
import { HeaderRightChat } from "../NavBar"
import { Textplainer } from "../Placeholder"
import { Placeholder } from "../Styles"

class ListItem extends React.Component {
  _onPress = () => {
    this.props.navigation.navigate("AddEditAsset", {
      itemId: this.props.item.id
    })
  }

  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View>
          <Text style={{ color: "blue" }}>
            {this.props.item.name}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export default class AssetList extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Dina värdeföremål",
    headerRight: <HeaderRightChat navigation={navigation} />
  })

  componentDidMount() {
    this.props.dispatch({ type: "LOADED_ASSETS" })
  }

  render() {
    let assets = this.props.assets

    return (
      <View style={{ flex: 1 }}>
        <Button
          title="Lägg till pryl"
          onPress={() => this.props.navigation.navigate("AddEditAsset")}
        />
        <Placeholder>
          <Textplainer text="Asset Tracker" />
        </Placeholder>
        <FlatList
          data={assets}
          renderItem={({ item }) =>
            <ListItem item={item} navigation={this.props.navigation} />}
        />
      </View>
    )
  }
}
