import styled from "styled-components"

export const StyledMessage = styled.div`
  background-color: ${props => props.theme.colors.hedvigMessageBackground};
  border-radius: 5px;
  padding: 5px 10px 5px 10px;
  width: 70%;
`

export const StyledOption = styled.div`
  cursor: pointer;
  border: solid 1px ${props => props.theme.colors.purple};
  border-radius: 5px;
  padding: 5px 10px 5px 10px;
  margin-bottom: 5px;
`
