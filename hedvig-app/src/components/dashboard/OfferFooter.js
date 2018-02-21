/* global require */
import React from "react"
import PropTypes from "prop-types"

import { StyledDashboardHeader, StyledDashboardHeaderRow, StyledDashboardHeaderItem, StyledDashboardHeaderIcon } from "../styles/dashboard"
import { StyledPassiveText } from "../styles/text";
import { INSURANCE_TYPES } from "../../constants"

const OfferFooter = ({insuranceType}) => (
  <StyledDashboardHeader style={{paddingTop: 8, paddingBottom: 8}}>
    <StyledDashboardHeaderRow style={{marginBottom: 4}}>
      <StyledDashboardHeaderItem>
        <StyledDashboardHeaderIcon style={{marginTop: 8}} source={require("../../../assets/icons/my_insurance/aktiv.png")} />
        <StyledPassiveText>Tryggas av en av världens{"\n"}största återförsäkringskoncerner</StyledPassiveText>
      </StyledDashboardHeaderItem>
    </StyledDashboardHeaderRow>
    { insuranceType === INSURANCE_TYPES.BRF || insuranceType === INSURANCE_TYPES.SUBLET_BRF ? (
      <StyledDashboardHeaderRow>
        <StyledDashboardHeaderItem>
          <StyledDashboardHeaderIcon source={require("../../../assets/icons/my_insurance/aktiv.png")} />
          <StyledPassiveText>Lägenheten försäkras till sitt fulla värde</StyledPassiveText>
        </StyledDashboardHeaderItem>
      </StyledDashboardHeaderRow>
    ) : null }
    <StyledDashboardHeaderRow>
      <StyledDashboardHeaderItem>
        <StyledDashboardHeaderIcon source={require("../../../assets/icons/my_insurance/aktiv.png")} />
        <StyledPassiveText>Prylarna försäkras till totalt 1 000 000 kr</StyledPassiveText>
      </StyledDashboardHeaderItem>
    </StyledDashboardHeaderRow>
    <StyledDashboardHeaderRow>
      <StyledDashboardHeaderItem>
        <StyledDashboardHeaderIcon source={require("../../../assets/icons/my_insurance/aktiv.png")} />
        <StyledPassiveText>Din självrisk är 1 500 kr</StyledPassiveText>
      </StyledDashboardHeaderItem>
    </StyledDashboardHeaderRow>
  </StyledDashboardHeader>
)

OfferFooter.propTypes = {
  insuranceType: PropTypes.oneOf(Object.values(INSURANCE_TYPES))
}

export default OfferFooter
