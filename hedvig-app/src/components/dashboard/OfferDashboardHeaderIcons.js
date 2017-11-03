import React from "react"
import { View } from "react-native"
import {
  StyledDashboardHeaderRow,
  StyledDashboardHeaderItem,
  StyledDashboardHeaderIcon
} from "../styles/dashboard"
import { StyledText, StyledHeading } from "../styles/text"

const OfferDashboardHeaderIcons = () => {
  return (
    <View>
      <StyledDashboardHeaderRow>
        <StyledDashboardHeaderItem>
          <StyledDashboardHeaderIcon
            source={require("../../../assets/icons/my_insurance/startdatum.png")}
          />
          <StyledText>Startdatum: När din nuvarande avslutas</StyledText>
        </StyledDashboardHeaderItem>
      </StyledDashboardHeaderRow>
      <StyledDashboardHeaderRow>
        <StyledDashboardHeaderItem>
          <StyledDashboardHeaderIcon
            source={require("../../../assets/icons/my_insurance/worldwide.png")}
          />
          <StyledText>Gäller i hela världen</StyledText>
        </StyledDashboardHeaderItem>
      </StyledDashboardHeaderRow>
    </View>
  )
}

export default OfferDashboardHeaderIcons
