import React from "react"
import {
  View,
  ScrollView,
  Button,
  Text,
  Image,
  TouchableOpacity
} from "react-native"
import { Link, ClaimLink } from "../../containers/Link"
import { Textplainer } from "../Placeholder"
import { HeaderRightChat } from "../NavBar"
import { PerilsCategory } from "./PerilsCategory"
import { Placeholder as PlaceholderStyle } from "../Styles"
import Placeholder from "rn-placeholder"
import styled from "styled-components/native"
import { CircularFontText } from "../../components/styles/typography"
import { TextButton } from "../Button"
import {
  StyledDashboardContainer,
  StyledDashboardHeader,
  StyledDashboardHeaderRow
} from "../styles/dashboard"
import { StyledText, StyledHeading } from "../styles/text"
const R = require("ramda")

export default class Dashboard extends React.Component {
  state = {
    editMode: false
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Din Försäkring",
    headerRight: <HeaderRightChat navigation={navigation} />
  })

  componentWillMount() {
    this.props.getInsurance()
  }

  renderCategories() {
    return this.props.categories.map(({ title, perils, iconUrl }, i) => {
      return (
        <PerilsCategory
          title={title}
          perils={perils}
          editMode={this.state.editMode}
          iconUrl={iconUrl}
          key={i}
          navigation={this.props.navigation}
        />
      )
    })
  }

  maybeCheckoutButton() {
    if (this.props.newTotalPrice !== null)
      return <Button title="Checkout" onPress={() => this.props.checkout()} />
  }

  render() {
    return (
      <StyledDashboardContainer style={{ flex: 1 }}>
        <StyledDashboardHeader>
          <StyledDashboardHeaderRow>
            <StyledHeading>Din hemförsäkring</StyledHeading>
            <TextButton
              title={this.state.editMode ? "Avbryt" : "Skräddarsy"}
              onPress={() => this.setState({ editMode: !this.state.editMode })}
            />
          </StyledDashboardHeaderRow>
          <StyledDashboardHeaderRow>
            <StyledText>Aktiv</StyledText>
            <StyledText>299 kr/mån</StyledText>
            <StyledText>Gäller i hela världen</StyledText>
          </StyledDashboardHeaderRow>
        </StyledDashboardHeader>
        <ScrollView style={{ flex: 1 }}>
          {this.renderCategories()}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Placeholder.Media size={70} color="lightgray" hasRadius />
            <CircularFontText>Gäller i hela världen</CircularFontText>
          </View>
        </ScrollView>
        {this.maybeCheckoutButton()}
      </StyledDashboardContainer>
    )
  }
}
