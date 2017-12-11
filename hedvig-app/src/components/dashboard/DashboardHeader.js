import React from "react"
import {
  StyledDashboardHeaderRow,
  StyledDashboardHeaderItem,
  StyledDashboardHeaderIcon
} from "../styles/dashboard"
import { StyledText } from "../styles/text"

const DashboardHeader = ({ statusIcon, statusText }) => {
  return (
    <StyledDashboardHeaderRow>
      <StyledDashboardHeaderItem>
        {statusIcon()}
        <StyledText>{statusText()}</StyledText>
      </StyledDashboardHeaderItem>
      <StyledDashboardHeaderItem>
        <StyledDashboardHeaderIcon
          source={require("../../../assets/icons/my_insurance/pris.png")}
        />
        <StyledText>HELLO</StyledText>
      </StyledDashboardHeaderItem>
      <StyledDashboardHeaderItem>
        <StyledDashboardHeaderIcon
          source={require("../../../assets/icons/my_insurance/worldwide.png")}
        />
        <StyledText>Gäller i hela världen</StyledText>
      </StyledDashboardHeaderItem>
    </StyledDashboardHeaderRow>
  )
}

export default DashboardHeader
