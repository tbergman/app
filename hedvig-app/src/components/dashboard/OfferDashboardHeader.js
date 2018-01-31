/* global require */
import React from "react"
import { Asset } from "expo"
import {
  StyledDashboardHeader,
  StyledDashboardHeaderRow,
  StyledDashboardHeaderItem,
  StyledDashboardHeaderIcon
} from "../styles/dashboard"
import { StyledHeading, StyledPassiveText } from "../styles/text"

// Precache assets
Asset.loadAsync([
  require("../../../assets/icons/my_insurance/startdatum.png"),
  require("../../../assets/icons/my_insurance/pris.png")
])

const OfferDashboardHeader = ({ newTotalPrice, isCurrentlyInsured }) => {
  return (
    <StyledDashboardHeader>
      <StyledDashboardHeaderRow>
        <StyledHeading>Din hemförsäkring</StyledHeading>
      </StyledDashboardHeaderRow>
      <StyledDashboardHeaderRow>
        <StyledDashboardHeaderItem>
          <StyledDashboardHeaderIcon
            source={require("../../../assets/icons/my_insurance/startdatum.png")}
          />
          <StyledPassiveText>
            { isCurrentlyInsured ? "Startdatum: När din nuvarande kan avslutas" : "Idag"}
          </StyledPassiveText>
        </StyledDashboardHeaderItem>
      </StyledDashboardHeaderRow>
      <StyledDashboardHeaderRow>
        <StyledDashboardHeaderItem>
          <StyledDashboardHeaderIcon
            source={require("../../../assets/icons/my_insurance/pris.png")}
          />
          <StyledPassiveText>
            {newTotalPrice}kr/mån
          </StyledPassiveText>
        </StyledDashboardHeaderItem>
      </StyledDashboardHeaderRow>
      <StyledDashboardHeaderRow>
        <StyledDashboardHeaderItem>
          <StyledDashboardHeaderIcon
            source={require("../../../assets/icons/my_insurance/worldwide.png")}
          />
          <StyledPassiveText>
            Gäller på dina resor varsomhelst i världen
          </StyledPassiveText>
        </StyledDashboardHeaderItem>
      </StyledDashboardHeaderRow>
    </StyledDashboardHeader>
  )
}

export default OfferDashboardHeader
