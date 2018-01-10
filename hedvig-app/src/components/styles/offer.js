import styled from "styled-components/native"
import { CircularFontText } from "./typography"
import { Dimensions } from "react-native"
const { width } = Dimensions.get("window")

export const StyledBackgroundImage = styled.Image`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 125px;
  width: ${width};
  padding: 36px 0px 0 0px;
`

export const StyledCtaContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 176px;
  width: ${width}
  padding: 36px 0 0 0;
  align-items: center;
`

export const StyledPriceText = CircularFontText.extend`
  font-size: 20px;
  color: ${props => props.theme.colors.primary};
  background-color: transparent;
`

export const StyledPriceComment = CircularFontText.extend`
  font-size: 16px;
  color: ${props => props.theme.colors.blackPurple}
  margin-top: 8px;
  margin-bottom: 16px;
  background-color: transparent;
`

export const StyledButtonContainer = styled.View`
  margin-top: 16px;
`
