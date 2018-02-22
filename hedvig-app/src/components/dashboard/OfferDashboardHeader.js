/* global require */
import React from "react"
import PropTypes from "prop-types"
import {
  StyledDashboardHeader,
  StyledDashboardHeaderRow,
  StyledDashboardHeaderItem,
  StyledDashboardHeaderIcon
} from "../styles/dashboard"
import { StyledHeading, StyledPassiveText } from "../styles/text"

const OfferDashboardHeader = ({ newTotalPrice, isCurrentlyInsured }) => (
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

OfferDashboardHeader.propTypes = {
  newTotalPrice: PropTypes.number.isRequired,
  isCurrentlyInsured: PropTypes.bool.isRequired,
}

export default OfferDashboardHeader
