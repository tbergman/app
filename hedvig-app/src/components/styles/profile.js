import styled from "styled-components/native"
import { StyledText, StyledPassiveText } from "./text"

export const StyledProfileContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.white};
`

export const StyledCharityImage = styled.Image`
  height: 50px;
  margin-top: 16px;
  margin-bottom: 16px;
  width: 80%;
`

export const StyledCharityParagraph = StyledPassiveText.extend`
  text-align: center;
  margin: 0px 44px;
`

export const StyledCharitySignature = StyledText.extend`
  text-align: center;
  margin: 0px 44px;
`
