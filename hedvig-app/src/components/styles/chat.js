import styled from "styled-components/native"
import * as typography from "./typography"

export const StyledChatContainer = styled.View`
  flex: 1;
  align-self: stretch;
  background: ${props => props.theme.colors.white}
`

export const StyledMessageArea = styled.View`
  flex: 3;
  align-self: stretch;
  padding: 16px;
`

export const StyledResponseArea = styled.View`
  flex: 2;
`

// Regular text messages

export const StyledDefaultMessageText = typography.MerriweatherFontText.extend`
  color: ${props => props.theme.colors.hedvigMessageText};
  font-size: ${props => props.theme.typography.hedvigMessage.fontSize};
`

export const StyledChatMessage = styled.View`
  flex-direction: row;
  padding: 12px 16px;
  border-radius: 8px;
  width: 80%;
  background: ${props => props.theme.colors.hedvigMessageBackground};
  margin-bottom: 8;
`

export const StyledHeroMessage = StyledChatMessage.extend`
  flex-direction: column;
  width: 98%;
`

export const StyledAvatarContainer = styled.View`
  margin-left: 15px;
  margin-bottom: 15px;
`

// Single select & multiple select

export const StyledMarginRightContainer = styled.View`
  margin-right: 8px;
`

export const StyledRightAlignedOptions = styled.View`
  flex-direction: row-reverse;
  align-self: flex-end;
`

// Multiple select

export const StyledOptionsContainer = styled.View`margin-bottom: 8px;`

// Text input

export const StyledTextInputContainer = styled.View`
  flex-direction: row;
  margin-right: 8px;
  margin-left: 8px;
`

export const StyledTextInput = styled.TextInput`
  flex: 1;
  align-self: stretch;
  height: ${props => props.theme.input.default.height};
  padding: 10px 16px;
  margin-right: 8px;
  background-color: ${props => props.theme.colors.white};
  border-color: ${props => props.theme.colors.primary};
  border-width: 1px;
  border-radius: 24px;
  font-size: ${props => props.theme.typography.input.fontSize};
`

// Date input

export const StyledDatePickerResultRow = styled.View`
  margin: 0 8px 8px 8px;
  flex-direction: row;
`

export const StyledFakeTextInput = styled.View`
  flex: 1;
  align-self: stretch;
  height: ${props => props.theme.input.default.height};
  padding: 10px 16px;
  margin-right: 8px;
  background-color: ${props => props.theme.colors.white};
  border-color: ${props => props.theme.colors.primary};
  border-width: 1px;
  border-radius: 24px;
`

export const StyledFakeTextInputText = styled.Text`
  font-size: ${props => props.theme.typography.input.fontSize};
  color: ${props => props.theme.typography.activeText.color}
`
