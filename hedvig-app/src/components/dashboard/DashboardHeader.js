import React from "react"
import {
  StyledDashboardHeader,
  StyledDashboardHeaderRow,
  StyledDashboardHeaderItem,
  StyledDashboardHeaderIcon
} from "../styles/dashboard"
import { StyledText, StyledHeading } from "../styles/text"
import { TextButton } from "../Button"

const DashboardHeader = ({ editMode, statusIcon, statusText }) => {
  return (
    <StyledDashboardHeader>
      <StyledDashboardHeaderRow>
        <StyledHeading>Din hemförsäkring</StyledHeading>
        <TextButton
          title={editMode ? "Avbryt" : "Skräddarsy"}
          onPress={() => this.setState({ editMode: !editMode })}
        />
      </StyledDashboardHeaderRow>
      <StyledDashboardHeaderRow>
        <StyledDashboardHeaderItem>
          {statusIcon()}
          <StyledText>{statusText()}</StyledText>
        </StyledDashboardHeaderItem>
        <StyledDashboardHeaderItem>
          <StyledDashboardHeaderIcon
            source={require("../../../assets/icons/my_insurance/pris.png")}
          />
          <StyledText>kr/mån</StyledText>
        </StyledDashboardHeaderItem>
        <StyledDashboardHeaderItem>
          <StyledDashboardHeaderIcon
            source={require("../../../assets/icons/my_insurance/worldwide.png")}
          />
          <StyledText>Gäller i hela världen</StyledText>
        </StyledDashboardHeaderItem>
      </StyledDashboardHeaderRow>
    </StyledDashboardHeader>
  )
}

export default DashboardHeader
