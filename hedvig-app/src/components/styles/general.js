import styled from "styled-components/native"

export const StyledCenter = styled.View`
  align-items: center;
  justify-content: center;
`

export const StyledFlexEnd = styled.View`
  align-self: flex-end;
`

export const StyledRow = styled.View`
  flex-direction: row;
`

export const StyledWrappingRow = StyledRow.extend`
  flex-wrap: wrap;
`

export const StyledCenteredRow = StyledRow.extend`
  align-items: center;
  justify-content: center;
`
