import styled from "styled-components/native"
import { CircularFontText, MerriweatherFontText } from "./typography"

export const StyledButton = styled.TouchableOpacity``

export const StyledDisabledButton = styled.View``

export const StyledButtonText = CircularFontText.extend`
  color: ${props => props.theme.button.textButton.color};
  font-size: ${props => props => props.theme.button.textButton.fontSize};
  background-color: transparent;
  line-height: ${props => props.theme.button.textButton.fontSize + 4};
`

export const StyledButtonTextInverted = CircularFontText.extend`
  font-size: ${props => props => props.theme.button.textButton.fontSize};
  color: ${props => props.theme.colors.white};
`

export const StyledButtonTextPrefix = StyledButtonText.extend`
  color: ${props => props.theme.button.textButton.prefixColor};
`

export const StyledRoundedButton = styled.TouchableOpacity`
  min-height: ${props => props.theme.input.option.height};
  padding: 8px 16px;
  background-color: ${props => props.theme.colors.white};
  border-color: ${props => props.theme.colors.primary};
  border-width: 1px;
  border-radius: 24px;
  align-items: center;
  justify-content: center;
  align-self: center;
`

export const StyledChatResponseButton = StyledRoundedButton.extend`
  margin-bottom: 8px;
`

export const StyledTransparentButton = StyledRoundedButton.extend`
  background-color: transparent;
`

export const StyledMultipleSelectOptionButton = styled.TouchableHighlight`
  height: ${props => props.theme.input.default.height};
  padding: 10px 16px;
  background-color: ${props =>
    props.selected ? props.theme.colors.primary : props.theme.colors.white};
  border-color: ${props => props.theme.colors.primary};
  border-width: 1px;
  border-radius: 24px;
  align-items: center;
  justify-content: center;
  align-self: center;

  align-self: flex-end;
  margin-bottom: 8px;
`

export const StyledRoundedButtonInverted = StyledRoundedButton.extend`
  background-color: ${props => props.theme.colors.primary};
`

export const StyledRedRoundedButtonInverted = StyledRoundedButton.extend`
  background-color: ${props => props.theme.colors.red};
  border-color: ${props => props.theme.colors.red};
`

export const StyledTurquoiseRoundedButtonInverted = StyledRoundedButton.extend`
  background-color: ${props => props.theme.colors.turquoise};
  border-color: ${props => props.theme.colors.turquoise};
`

export const StyledFabButton = StyledButton.extend`
  position: absolute;
  bottom: 10;
  right: 16;
  z-index: 10;
`
