import styled from "styled-components/native"

export const StyledTextButton = styled.TouchableOpacity`

`

export const StyledButtonText = styled.Text`
  color: ${props => props.theme.button.textButton.color};
  font-size: ${props => props => props.theme.button.textButton.fontSize};
`

export const StyledButtonTextPrefix = StyledButtonText.extend`
  color: ${props => props.theme.button.textButton.prefixColor}
`

export const StyledRoundedButton = styled.TouchableOpacity`
  padding: 10px 24px;
  border-color: ${props => props.theme.colors.primary};
  border-width: 1px;
  border-radius: 24px;
  align-items: center;
  justify-content: center;
  align-self: center;
`

export const StyledChatResponseButton = StyledRoundedButton.extend`
  align-self: flex-end;
  margin-bottom: 8px;
`
