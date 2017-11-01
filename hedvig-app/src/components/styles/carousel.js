import styled from "styled-components/native"
import { MerriweatherFontText, CircularFontText } from "./typography"

export const StyledCarouselContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.white};
`

export const StyledAlignedCarouselItems = styled.View`
  flex: 1;
  align-items: center;
  padding-top: 32px;
`

export const StyledCarouselTexts = styled.ScrollView`
  margin-top: 30px;
`

export const StyledImageCarouselContainer = styled.View`
  height: 185px;
`

export const StyledCarouselImage = styled.Image`
  height: 185px;
  width: ${props => props.width};
`

export const StyledCarouselHeading = MerriweatherFontText.extend`
  font-size: 24px;
  text-align: center;
  padding-bottom: 24px;
  margin: 0px 40px;
`

export const StyledCarouselParagraph = CircularFontText.extend`
  font-size: 16px;
  color: ${props => props.theme.typography.passiveText.color}
  text-align: center;
  margin: 0px 40px 40px 40px;
`

export const StyledParagraphToggleContainer = styled.View`
  margin-bottom: 40px;
`
