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
import { TextButton, RoundedButton } from "../Button"
import {
  StyledDashboardContainer,
  StyledDashboardHeader,
  StyledDashboardHeaderRow,
  StyledCategoriesContainer,
  StyledCheckoutButton,
  StyledDashboardHeaderItem,
  StyledDashboardHeaderIcon
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
    let categories = this.props.categories.map(({ title, perils, iconUrl }, i) => {
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
    return (
      <StyledCategoriesContainer>
        {categories}
      </StyledCategoriesContainer>
    )
  }

  maybeCheckoutButton() {
    if (this.props.newTotalPrice !== null) {
      let prefix = `${this.props.newTotalPrice} kr`
      return (
        <StyledCheckoutButton>
          <RoundedButton
            prefix={prefix}
            title="Betala ändringar"
            onPress={() => this.props.checkout()}
          />
        </StyledCheckoutButton>
      )
    }
  }

  statusIcon() {
    imageModule = {
      ACTIVE: require("../../../assets/icons/my_insurance/aktiv.png"),
      PENDING: require("../../../assets/icons/edit_perils/added_peril.png"),
      INACTIVE: require("../../../assets/icons/edit_perils/remove_peril.png"),
      DENIED: require("../../../assets/icons/edit_perils/remove_peril.png")
    }[this.props.insurance.status]
    return (
      <StyledDashboardHeaderIcon source={imageModule} />
    )
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
            <StyledDashboardHeaderItem>
              {this.statusIcon()}
              <StyledText>Aktiv</StyledText>
            </StyledDashboardHeaderItem>
            <StyledText>{this.props.currentTotalPrice} kr/mån</StyledText>
            <StyledText>Gäller i hela världen</StyledText>
          </StyledDashboardHeaderRow>
        </StyledDashboardHeader>
        <ScrollView style={{ flex: 1 }}>
          {this.renderCategories()}
        </ScrollView>
        {this.maybeCheckoutButton()}
      </StyledDashboardContainer>
    )
  }
}
