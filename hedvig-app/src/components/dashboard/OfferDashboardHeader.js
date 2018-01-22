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

const OfferDashboardHeader = ({ newTotalPrice }) => {
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
            {newTotalPrice}kr/mån
          </StyledPassiveText>
        </StyledDashboardHeaderItem>
      </StyledDashboardHeaderRow>
      <StyledDashboardHeaderRow>
        <StyledDashboardHeaderItem>
          <StyledDashboardHeaderIcon
            source={require("../../../assets/icons/my_insurance/pris.png")}
          />
          <StyledPassiveText>
            Din självrisk är 1500 kr
          </StyledPassiveText>
        </StyledDashboardHeaderItem>
      </StyledDashboardHeaderRow>
    </StyledDashboardHeader>
  )
}

export default OfferDashboardHeader
