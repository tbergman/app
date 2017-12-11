import React from "react"
import {
  StyledDashboardHeaderOffWhite,
  StyledDashboardHeaderRowLessMargin,
  StyledDashboardHeaderItem
} from "../styles/dashboard"
import { StyledPassiveText, StyledHeading } from "../styles/text"

const DashboardHeader = ({ statusIcon, statusText }) => {
  return (
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
}

export default DashboardHeader
