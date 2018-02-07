import React from "react"
import PropTypes from "prop-types"
import {
  StyledDashboardHeaderOffWhite,
  StyledDashboardHeaderRowLessMargin,
  StyledDashboardHeaderItem
} from "../styles/dashboard"
import { StyledPassiveText, StyledHeading } from "../styles/text"

const DashboardHeader = ({ statusIcon, statusText }) => (
  <StyledDashboardHeaderOffWhite>
    <StyledDashboardHeaderRowLessMargin>
      <StyledHeading>Min hemförsäkring</StyledHeading>
      <StyledDashboardHeaderItem>
        {statusIcon()}
        <StyledPassiveText>{statusText()}</StyledPassiveText>
      </StyledDashboardHeaderItem>
    </StyledDashboardHeaderRowLessMargin>
  </StyledDashboardHeaderOffWhite>
)

DashboardHeader.propTypes = {
  statusIcon: PropTypes.func.isRequired,
  statusText: PropTypes.func.isRequired
}

export default DashboardHeader
