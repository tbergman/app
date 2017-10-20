import styled from "styled-components/native"

export const StyledDashboardContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.offWhite};
`

export const StyledDashboardHeader = styled.View`
  background-color: ${props => props.theme.colors.white};
  padding-top: 22;
  padding-right: 24;
  padding-bottom: 12;
  padding-left: 24;
`

export const StyledDashboardHeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10;
`

export const StyledCategoriesContainer = styled.View`
  padding: 8px;
`

export const StyledPerilsContainer = styled.View`
  margin-bottom: 8px;
  background-color: ${props => props.theme.colors.white};
  padding: 14px;
`
