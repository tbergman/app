import styled from "styled-components/native"
import * as typography from "./typography"

export const StyledChatContainer = styled.View`
  flex: 1;
  align-self: stretch;
`

export const StyledMessageArea = styled.View`
  flex: 1;
  align-self: stretch;
  padding: 16px;
`

export const StyledDefaultMessage = typography.MerriweatherFontText.extend`
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

export const StyledResponseArea = styled.View`
  flex: 1;
`

export const StyledRightAlignedOptions = styled.View`
  flex-direction: row-reverse;
  align-self: flex-end;
`
