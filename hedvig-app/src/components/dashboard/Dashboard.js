import React from "react"
import { View, ScrollView } from "react-native"

import { HeaderRightChat } from "../NavBar"
import { PerilsCategory } from "./PerilsCategory"

import { TextButton, RoundedButton } from "../Button"
import {
  StyledDashboardContainer,
  StyledDashboardHeader,
  StyledDashboardHeaderRow,
  StyledCategoriesContainer,
  StyledCheckoutButton,
  StyledDashboardHeaderIcon,
  StyledConditionRow
} from "../styles/dashboard"
import { StyledHeading, StyledPassiveText } from "../styles/text"
import DashboardHeader from "./DashboardHeader"
import OfferDashboardHeaderIcons from "../../containers/dashboard/OfferDashboardHeaderIcons"

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
            offerMode={this.props.mode === "offer"}
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
    if (this.props.newTotalPrice !== null && this.props.mode !== "offer") {
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
        <DashboardHeader
          statusIcon={this.statusIcon.bind(this)}
          statusText={this.statusText.bind(this)}
        />
      )
    }
  }

  render() {
    return (
      <StyledDashboardContainer style={{ flex: 1 }}>
        <StyledDashboardHeader>
          <StyledDashboardHeaderRow>
            <StyledHeading>Din hemförsäkring</StyledHeading>
            {this.props.mode === "offer" ? null : (
              <TextButton
                title={this.state.editMode ? "Avbryt" : "Skräddarsy"}
                onPress={() =>
                  this.setState({ editMode: !this.state.editMode })}
              />
            )}
          </StyledDashboardHeaderRow>
          {this.headerIcons()}
        </StyledDashboardHeader>
        <ScrollView style={{ flex: 1 }}>
          {this.renderCategories()}

          <View>
            <View style={{ marginLeft: 24 }}>
              <StyledConditionRow>
                <StyledDashboardHeaderIcon
                  source={require("../../../assets/icons/my_insurance/aktiv.png")}
                />
                <StyledPassiveText>
                  Lägenheten försäkras till sitt fulla värde
                </StyledPassiveText>
              </StyledConditionRow>
              <StyledConditionRow>
                <StyledDashboardHeaderIcon
                  source={require("../../../assets/icons/my_insurance/pris.png")}
                />
                <StyledPassiveText>
                  Prylarna försäkras till totalt 1 000 000 kr
                </StyledPassiveText>
              </StyledConditionRow>
              <StyledConditionRow>
                <StyledDashboardHeaderIcon
                  source={require("../../../assets/icons/my_insurance/worldwide.png")}
                />
                <StyledPassiveText>
                  Gäller på resor varsomhelst i världen
                </StyledPassiveText>
              </StyledConditionRow>
            </View>
            {this.props.mode === "offer" ? (
              <View
                style={{
                  alignSelf: "stretch",
                  height: this.props.extraScrollViewPadding || 250
                }}
              />
            ) : null}
          </View>
        </ScrollView>
        {this.maybeCheckoutButton()}
      </StyledDashboardContainer>
    )
  }
}
