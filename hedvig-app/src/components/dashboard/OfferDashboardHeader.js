import React from "react"
import {
  StyledDashboardHeader,
  StyledDashboardHeaderRow,
  StyledDashboardHeaderItem,
  StyledDashboardHeaderIcon
} from "../styles/dashboard"
import { StyledHeading, StyledPassiveText } from "../styles/text"

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
            {newTotalPrice}kr/mån, ingen bindningstid
          </StyledPassiveText>
        </StyledDashboardHeaderItem>
      </StyledDashboardHeaderRow>
    </StyledDashboardHeader>
  )
}

export default OfferDashboardHeader
