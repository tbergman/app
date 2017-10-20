import styled from "styled-components/native"

export const StyledTextButton = styled.TouchableOpacity`

`

export const StyledTextButtonText = styled.Text`
  color: ${props => props.theme.button.textButton.color};
  font-size: ${props => props => props.theme.button.textButton.fontSize};
`
