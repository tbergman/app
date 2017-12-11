import React from "react"
import { View } from "react-native"
import {
  StyledDashboardHeaderRow,
  StyledDashboardHeaderItem,
  StyledDashboardHeaderIcon
} from "../styles/dashboard"
import { StyledPassiveText } from "../styles/text"

const OfferDashboardHeaderIcons = ({ newTotalPrice }) => {
  return (
    <View>
      <StyledDashboardHeaderRow>
        <StyledDashboardHeaderItem>
          <StyledDashboardHeaderIcon
            source={require("../../../assets/icons/my_insurance/startdatum.png")}
          />
          <StyledPassiveText>
            Startdatum: När din nuvarande kan avslutas
          </StyledPassiveText>
        </StyledDashboardHeaderItem>
      </StyledDashboardHeaderRow>
      <StyledDashboardHeaderRow>
        <StyledDashboardHeaderItem>
          <StyledDashboardHeaderIcon
            source={require("../../../assets/icons/my_insurance/pris.png")}
          />
          <StyledPassiveText>
            {newTotalPrice}kr/mån, ingen bindningstid
          </StyledPassiveText>
        </StyledDashboardHeaderItem>
      </StyledDashboardHeaderRow>
    </View>
  )
}

export default OfferDashboardHeaderIcons
