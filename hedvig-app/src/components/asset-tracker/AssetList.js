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
            {this.props.item.title}
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

  componentWillMount() {
    this.props.getAssets()
  }

  maybeList() {
    if (this.props.assets.length > 0) {
      return (
        <FlatList
          data={this.props.assets}
          renderItem={({ item }) =>
            <ListItem item={item} navigation={this.props.navigation} />}
        />
      )
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button
          title="Lägg till pryl"
          onPress={() => this.props.navigation.navigate("AddEditAsset")}
        />
        <Placeholder>
          <Textplainer text="Asset Tracker" />
        </Placeholder>
        {this.maybeList()}
      </View>
    )
  }
}
