/* global require */
import React from "react"
import { Asset } from "expo"
import { View, ScrollView } from "react-native"
import { NavBar } from "../NavBar"
import {
  StyledButtonContainer,
  StyledBackgroundImage,
  StyledCtaContainer
} from "../styles/offer"
import {
  TurquoiseRoundedInvertedButton,
  XNavigateBackButton
} from "../Button"
import { PerilsCategory } from "./PerilsCategory";
import OfferDashboardHeader from "../dashboard/OfferDashboardHeader"
import { StyledDashboardHeader, StyledDashboardHeaderRow, StyledDashboardHeaderItem, StyledDashboardHeaderIcon } from "../styles/dashboard"
import { StyledText, StyledPassiveText } from "../styles/text";
import { TextLink } from "../Link"

const HEDVIG_FORKOP_S3_LINK = "https://s3.eu-central-1.amazonaws.com/com-hedvig-web-content/Hedvig+-+F%C3%B6rk%C3%B6psinformation+Bostadsr%C3%A4tt.pdf"
const HEDVIG_INTEGRITET_S3_LINK = "https://s3.eu-central-1.amazonaws.com/com-hedvig-web-content/Hedvig+-+integritetspolicy.pdf"
const HEDVIG_VILLKOR_S3_LINK = "https://s3.eu-central-1.amazonaws.com/com-hedvig-web-content/Hedvig+F%C3%B6rs%C3%A4kringsvillkor+Bostadsr%C3%A4tt+(draft+v.6+171220)+.pdf"

// Precache assets
Asset.loadAsync([
  require("../../../assets/bgs/gradient-white-rectangle.png"),
  require("../../../assets/icons/my_insurance/pris.png"),
  require("../../../assets/icons/my_insurance/aktiv.png"),
  require("../../../assets/icons/my_insurance/worldwide.png"),
  require("../../../assets/icons/info/info_green.png")
])

const OfferFooter = () => (
  <StyledDashboardHeader style={{paddingTop: 8}}>
    <StyledDashboardHeaderRow>
      <StyledDashboardHeaderItem>
        <StyledDashboardHeaderIcon source={require("../../../assets/icons/info/info_green.png")} />
        <StyledPassiveText style={{flexWrap: "wrap", maxWidth: "100%"}}>Tryggat av en av världens största återförsäkringskoncerner</StyledPassiveText>
      </StyledDashboardHeaderItem>
    </StyledDashboardHeaderRow>
    <StyledDashboardHeaderRow>
      <StyledDashboardHeaderItem>
        <StyledDashboardHeaderIcon source={require("../../../assets/icons/my_insurance/aktiv.png")} />
        <StyledPassiveText>Lägenheten försäkras till sitt fulla värde</StyledPassiveText>
      </StyledDashboardHeaderItem>
    </StyledDashboardHeaderRow>
    <StyledDashboardHeaderRow>
      <StyledDashboardHeaderItem>
        <StyledDashboardHeaderIcon source={require("../../../assets/icons/my_insurance/pris.png")} />
        <StyledPassiveText>Prylarna försäkras till totalt 1 000 000 kr</StyledPassiveText>
      </StyledDashboardHeaderItem>
    </StyledDashboardHeaderRow>
    <StyledDashboardHeaderRow>
      <StyledDashboardHeaderItem>
        <StyledDashboardHeaderIcon source={require("../../../assets/icons/my_insurance/worldwide.png")} />
        <StyledPassiveText>Gäller på resor varsomhelst i världen</StyledPassiveText>
      </StyledDashboardHeaderItem>
    </StyledDashboardHeaderRow>
  </StyledDashboardHeader>
)

class Offer extends React.Component {
  componentWillMount() {
    this.props.getInsurance()
  }

  render() {
    return (
      <View style={{ flex: 1, alignSelf: "stretch" }}>
        <NavBar
          headerLeft={
            <XNavigateBackButton onPress={() => this.props.closeModal()} />
          }
        />
        <ScrollView style={{backgroundColor: "#F9FAFC"}}>
          <OfferDashboardHeader newTotalPrice={this.props.insurance.newTotalPrice} />
          <View style={{paddingHorizontal: 8, paddingBottom: 8}}>
            {this.props.insurance.categories.map((category, index) => (
              <PerilsCategory
                offerMode
                key={index}
                perils={category.perils}
                title={category.title}
                description={category.description}
                iconUrl={category.iconUrl}
                navigation={this.props.navigation}
              >
              </PerilsCategory>
            ))}
          </View>
          <OfferFooter />
          <StyledPassiveText style={{paddingHorizontal: 12, paddingBottom: 125}}>
            Genom att trycka bli medlem bekräftar jag att jag tagit del av&nbsp;
            <TextLink to={HEDVIG_FORKOP_S3_LINK}>förköpsinformation</TextLink>,&nbsp;
            <TextLink to={HEDVIG_VILLKOR_S3_LINK}>villkor</TextLink> och att mina personuppgifter&nbsp;
            behandlas i enlighet med&nbsp;
            <TextLink to={HEDVIG_INTEGRITET_S3_LINK}>Personuppgiftslagen</TextLink>.
          </StyledPassiveText>
        </ScrollView>
        <StyledCtaContainer>
          <StyledBackgroundImage
            source={require("../../../assets/bgs/gradient-white-rectangle.png")}
            resizeMode="stretch"
          />
          <StyledButtonContainer style={{marginTop: 48}}>
            <TurquoiseRoundedInvertedButton
              onPress={() => this.props.checkout()}
              title="Bli medlem"
            />
          </StyledButtonContainer>
          <StyledText style={{marginTop: 8}}>
            Ingen bindingstid, avsluta när du vill
          </StyledText>
        </StyledCtaContainer>
      </View>
    )
  }
}

export default Offer
