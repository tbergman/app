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
import { StyledText, StyledHeading, StyledPassiveText } from "../styles/text"
import OfferDashboardHeaderIcons from "./OfferDashboardHeaderIcons"
const R = require("ramda")

export default class Dashboard extends React.Component {
  state = {
    editMode: false
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Min Försäkring",
    headerRight: <HeaderRightChat navigation={navigation} />
  })

  componentWillMount() {
    // this.props.getInsurance()
  }

  renderCategories() {
    let categories = this.props.categories.map(
      ({ title, description, perils, iconUrl }, i) => {
        return (
          <PerilsCategory
            title={title}
            description={description}
            perils={perils}
            editMode={this.state.editMode}
            iconUrl={iconUrl}
            key={i}
            navigation={this.props.navigation}
          />
        )
      }
    )
    return <StyledCategoriesContainer>{categories}</StyledCategoriesContainer>
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
      INACTIVE: require("../../../assets/icons/edit_perils/added_peril.png"),
      DENIED: require("../../../assets/icons/edit_perils/remove_peril.png")
    }[this.props.insurance.status]
    return <StyledDashboardHeaderIcon source={imageModule} />
  }

  statusText() {
    return {
      ACTIVE: "Aktiv",
      PENDING: "På gång",
      INACTIVE: "Inaktiv",
      DENIED: "Nekad"
    }[this.props.insurance.status]
  }

  headerIcons() {
    if (this.props.mode === "offer") {
      return <OfferDashboardHeaderIcons />
    } else {
      return (
        <StyledDashboardHeaderRow>
          <StyledDashboardHeaderItem>
            {this.statusIcon()}
            <StyledText>{this.statusText()}</StyledText>
          </StyledDashboardHeaderItem>
          <StyledDashboardHeaderItem>
            <StyledDashboardHeaderIcon
              source={require("../../../assets/icons/my_insurance/pris.png")}
            />
            <StyledText>{this.props.currentTotalPrice} kr/mån</StyledText>
          </StyledDashboardHeaderItem>
          <StyledDashboardHeaderItem>
            <StyledDashboardHeaderIcon
              source={require("../../../assets/icons/my_insurance/worldwide.png")}
            />
            <StyledText>Gäller i hela världen</StyledText>
          </StyledDashboardHeaderItem>
        </StyledDashboardHeaderRow>
      )
    }
  }

  render() {
    return (
      <StyledDashboardContainer style={{ flex: 1 }}>
        <StyledDashboardHeader>
          <StyledDashboardHeaderRow>
            <StyledHeading>Din hemförsäkring</StyledHeading>
            {/* {this.props.mode === "offer" ? null : ( // Commented out on request
              <TextButton
                title={this.state.editMode ? "Avbryt" : "Skräddarsy"}
                onPress={() =>
                  this.setState({ editMode: !this.state.editMode })}
              />
            )} */}
          </StyledDashboardHeaderRow>
          {this.headerIcons()}
        </StyledDashboardHeader>
        <ScrollView style={{ flex: 1 }}>
          {this.renderCategories()}
          {this.props.mode === "offer" ? (
            <View>
              <View style={{ marginLeft: 24 }}>
                <StyledPassiveText>
                  Min lägenhet är försäkrad till fullvärde
                </StyledPassiveText>
                <StyledPassiveText>
                  Mina prylar är försäkrade upp till 1 000 000 kr
                </StyledPassiveText>
                <StyledPassiveText>Min självrisk: 1 500 kr</StyledPassiveText>
              </View>
              <View
                style={{
                  alignSelf: "stretch",
                  height: this.props.extraScrollViewPadding || 250
                }}
              />
            </View>
          ) : null}
        </ScrollView>
        {this.maybeCheckoutButton()}
      </StyledDashboardContainer>
    )
  }
}
