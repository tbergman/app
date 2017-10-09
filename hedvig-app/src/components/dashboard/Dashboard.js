import React from "react"
import { View, ScrollView, Button, Text, Image, TouchableOpacity } from "react-native"
import { Link, ClaimLink } from "../../containers/Link"
import { Textplainer } from "../Placeholder"
import { HeaderRightChat } from "../NavBar"
import { PerilsCategory } from "./PerilsCategory"
import { Placeholder as PlaceholderStyle } from "../Styles"
import Placeholder from "rn-placeholder"
import styled from "styled-components/native"
const R = require("ramda")

export default class Dashboard extends React.Component {
  state = {
    editMode: false
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Din Försäkring",
    headerRight: <HeaderRightChat navigation={navigation} />
  })

  componentDidMount() {
    this.props.dispatch({ type: "LOADED_INSURANCE" })
  }

  renderCategories() {
    return this.props.categories.map(({title, perils, iconUrl}, i) => {
      return (
        <PerilsCategory title={title} perils={perils} editMode={this.state.editMode} iconUrl={iconUrl} key={i} navigation={this.props.navigation} />
      )
    })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Button title={this.state.editMode ? "Ok" : "Ändra"} onPress={() => this.setState({editMode: !this.state.editMode})} />
        <ScrollView style={{flex: 1}}>
          {this.renderCategories()}
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Placeholder.Media
              size={70}
              color="lightgray"
              hasRadius
            />
            <Text>Gäller i hela världen</Text>
          </View>
          <Button
            title="Launch modal on 2"
            onPress={() =>
              this.props.navigation.navigate("MyModal", {
                initialRouteName: "B"
              })}
          />
        </ScrollView>
      </View>
    )
  }
}
